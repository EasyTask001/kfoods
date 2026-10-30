import { getQuoteProductById } from './quote-products'

export interface QuoteFormData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  buyerType: string
  product: string
  packFormat: string
  quantity: string
  frequency: string
  incoterm: string
  destination: string
  certifications: string[]
  launchDate: string
  sampleRequest: string
  message: string
}

export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>

export const QUOTE_LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  phone: 40,
  country: 80,
  buyerType: 60,
  packFormat: 100,
  quantity: 100,
  frequency: 100,
  incoterm: 20,
  destination: 160,
  launchDate: 30,
  sampleRequest: 10,
  message: 2000,
} as const

export const BUYER_TYPES = [
  'Independent grocery',
  'Retail chain',
  'Foodservice distributor',
  'Importer',
  'Restaurant',
  'Private-label buyer',
  'Other business',
] as const

export const CERTIFICATION_REQUIREMENTS = [
  'BRCGS / SQF / FSSC 22000',
  'Organic',
  'Halal',
  'Kosher',
] as const
export const INCOTERMS = ['FOB', 'CIF', 'DDP'] as const

export function validateQuoteForm(form: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {}
  const required = {
    name: 'Enter your name.',
    company: 'Enter your company or organization.',
    email: 'Enter your email address.',
    buyerType: 'Select your buyer type.',
    product: 'Choose a product from the catalog.',
    quantity: 'Enter an estimated quantity, or “Not sure yet”.',
    destination: 'Enter a delivery city and state / province.',
  } as const

  for (const field of Object.keys(required) as (keyof typeof required)[]) {
    if (!form[field].trim()) errors[field] = required[field]
  }

  if (
    form.name.trim() &&
    (!/\p{L}/u.test(form.name) ||
      !/^[\p{L}\p{M}\p{Zs}\p{Pd}.'’‘·・\u200c\u200d]+$/u.test(form.name.trim()))
  ) {
    errors.name =
      'Use your name; letters in any language, spaces, apostrophes and hyphens are welcome.'
  }
  if (
    form.email.trim() &&
    !/^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(
      form.email.trim(),
    )
  ) {
    errors.email = 'Enter a valid email address, such as buyer@example.com.'
  }
  if (
    form.phone.trim() &&
    (!/^\+?[\d().\s-]+$/.test(form.phone.trim()) ||
      !/^\d{7,15}$/.test(form.phone.replace(/\D/g, '')))
  ) {
    errors.phone =
      'Enter 7–15 digits with an optional country code, spaces, parentheses or hyphens.'
  }
  if (!BUYER_TYPES.some((type) => type === form.buyerType))
    errors.buyerType = required.buyerType
  if (!getQuoteProductById(form.product)) errors.product = required.product
  if (
    form.certifications.some(
      (value) =>
        !CERTIFICATION_REQUIREMENTS.some(
          (requirement) => requirement === value,
        ),
    )
  ) {
    errors.certifications =
      'Select a listed requirement or describe your needs in additional details.'
  }
  if (form.incoterm && !INCOTERMS.some((value) => value === form.incoterm)) {
    errors.incoterm = 'Select a listed Incoterm or leave it unspecified.'
  }
  if (!['Yes', 'No'].includes(form.sampleRequest))
    errors.sampleRequest = 'Choose Yes or No.'

  for (const field of Object.keys(
    QUOTE_LIMITS,
  ) as (keyof typeof QUOTE_LIMITS)[]) {
    if (form[field].length > QUOTE_LIMITS[field]) {
      errors[field] =
        `Keep this field to ${QUOTE_LIMITS[field]} characters or fewer.`
    }
  }
  return errors
}

export const QUOTE_EMAIL = 'info@kfoods.us'
export const CONTACT_PHONE = '+14406019232'
export const CONTACT_PHONE_DISPLAY = '+1 (440) 601-9232'

export interface QuoteDraft {
  to: string
  subject: string
  body: string
  text: string
  mailtoUrl: string
  gmailUrl: string
}

/** Creates text and links locally. It never opens an app or sends an email. */
export function buildQuoteDraft(form: QuoteFormData): QuoteDraft | null {
  if (Object.keys(validateQuoteForm(form)).length) return null
  const product = getQuoteProductById(form.product)
  if (!product) return null
  const optional = (value: string) => value.trim() || 'Not specified'
  const subject = `Wholesale inquiry — ${product.name}`
  const body = [
    'Hello KFoods,',
    'Please share pricing, availability and order requirements for the following inquiry.',
    '',
    `Name: ${form.name.trim()}`,
    `Company: ${form.company.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${optional(form.phone)}`,
    `Country / region: ${optional(form.country)}`,
    `Buyer type: ${form.buyerType}`,
    `Product: ${product.name} (${product.id})`,
    `Estimated quantity: ${form.quantity.trim()}`,
    `Delivery destination: ${form.destination.trim()}`,
    `Pack format requested: ${optional(form.packFormat)}`,
    `Order frequency: ${optional(form.frequency)}`,
    `Target Incoterm requested: ${optional(form.incoterm)}`,
    `Target launch date: ${optional(form.launchDate)}`,
    `Sample request: ${form.sampleRequest}`,
    `Certification requirements (buyer request, not a certification claim): ${form.certifications.length ? form.certifications.join(', ') : 'None specified'}`,
    'KFoods must confirm availability and provide applicable documentation.',
    '',
    'Additional details:',
    form.message.trim() || 'None specified',
  ].join('\n')
  const mailtoParams = new URLSearchParams({ subject, body })
  const gmailParams = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: QUOTE_EMAIL,
    su: subject,
    body,
  })
  // Use %20 rather than + for mail clients that do not parse form-style spaces.
  const mailtoUrl = `mailto:${QUOTE_EMAIL}?${mailtoParams.toString().replace(/\+/g, '%20')}`
  return {
    to: QUOTE_EMAIL,
    subject,
    body,
    text: `To: ${QUOTE_EMAIL}\nSubject: ${subject}\n\n${body}`,
    mailtoUrl,
    gmailUrl: `https://mail.google.com/mail/?${gmailParams.toString()}`,
  }
}

export function createQuoteForm(
  initialProduct: unknown = '',
  initialPack: unknown = '',
): QuoteFormData {
  const product =
    typeof initialProduct === 'string'
      ? getQuoteProductById(initialProduct)
      : undefined
  return {
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    buyerType: '',
    product: product?.id ?? '',
    packFormat:
      typeof initialPack === 'string' &&
      product?.packages.some((pack) => pack.weight === initialPack)
        ? initialPack
        : '',
    quantity: '',
    frequency: '',
    incoterm: '',
    destination: '',
    certifications: [],
    launchDate: '',
    sampleRequest: 'No',
    message: '',
  }
}
