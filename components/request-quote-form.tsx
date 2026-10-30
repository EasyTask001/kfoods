'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
} from 'lucide-react'
import { getQuoteProductById, quoteProducts } from '@/lib/quote-products'
import {
  BUYER_TYPES,
  CERTIFICATION_REQUIREMENTS,
  INCOTERMS,
  QUOTE_EMAIL,
  QUOTE_LIMITS,
  buildQuoteDraft,
  createQuoteForm,
  validateQuoteForm,
  type QuoteDraft,
  type QuoteFormData,
  type QuoteFormErrors,
} from '@/lib/quote'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const selectClassName =
  'h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive md:text-sm'

function FieldError({
  field,
  error,
}: {
  field: keyof QuoteFormData
  error?: string
}) {
  return error ? (
    <p id={`${field}-error`} className="text-sm text-destructive">
      {error}
    </p>
  ) : null
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-primary">
      *
    </span>
  )
}

export function RequestQuoteForm({
  initialProduct = '',
  initialPack = '',
}: {
  initialProduct?: string
  initialPack?: string
}) {
  const [form, setForm] = useState(() =>
    createQuoteForm(initialProduct, initialPack),
  )
  const [errors, setErrors] = useState<QuoteFormErrors>({})
  const [draft, setDraft] = useState<QuoteDraft | null>(null)
  const [status, setStatus] = useState('')
  const draftHeading = useRef<HTMLHeadingElement>(null)
  const draftText = useRef<HTMLTextAreaElement>(null)
  const selectedProduct = getQuoteProductById(form.product)

  useEffect(() => {
    if (draft) draftHeading.current?.focus()
  }, [draft])

  function updateField<K extends keyof QuoteFormData>(
    field: K,
    value: QuoteFormData[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setDraft(null)
    setStatus('')
  }

  function controlProps(field: keyof QuoteFormData, helpId?: string) {
    return {
      id: field,
      name: field,
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby':
        [helpId, errors[field] ? `${field}-error` : '']
          .filter(Boolean)
          .join(' ') || undefined,
    }
  }

  function focusField(field: string) {
    const control = document.getElementById(field)
    const details = control?.closest('details')
    if (details) details.open = true
    control?.focus()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateQuoteForm(form)
    setErrors(nextErrors)
    setStatus('')
    if (Object.keys(nextErrors).length) {
      setDraft(null)
      requestAnimationFrame(() => focusField(Object.keys(nextErrors)[0]))
      return
    }
    // Preparing a draft makes no request and never launches an email service.
    setDraft(buildQuoteDraft(form))
  }

  async function copyDraft() {
    if (!draft) return
    try {
      await navigator.clipboard.writeText(draft.text)
      setStatus(
        `Draft copied. Paste it into an email to ${QUOTE_EMAIL}. Nothing has been sent.`,
      )
    } catch {
      draftText.current?.focus()
      draftText.current?.select()
      setStatus(
        'Clipboard access is unavailable. Select and copy the draft below, or download the text file. Nothing has been sent.',
      )
    }
  }

  const errorEntries = Object.entries(errors).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  )

  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-8 border-b border-border pb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Buyer inquiry
        </p>
        <h2 className="font-serif text-3xl font-semibold">
          Let’s talk about your next order.
        </h2>
        <p
          id="quote-privacy"
          className="mt-3 text-sm leading-relaxed text-muted-foreground"
        >
          Nothing is sent from this website. Prepare a draft, review it, then
          send it yourself to{' '}
          <span className="font-medium text-foreground">{QUOTE_EMAIL}</span>{' '}
          using your email app.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Fields marked * are required. An estimate is fine.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="quote-privacy"
        className="space-y-8"
      >
        {errorEntries.length > 0 && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-4"
          >
            <p className="font-semibold">
              Please check the highlighted details.
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {errorEntries.map(([field, error]) => (
                <li key={field}>
                  <a
                    href={`#${field}`}
                    onClick={(event) => {
                      event.preventDefault()
                      focusField(field)
                    }}
                    className="underline underline-offset-4"
                  >
                    {error}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className="space-y-5">
          <legend className="mb-5 text-sm font-semibold">
            <span className="mr-2 text-muted-foreground">01</span> Your business
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Your name <RequiredMark />
              </Label>
              <Input
                {...controlProps('name', 'name-help')}
                required
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                maxLength={QUOTE_LIMITS.name}
                className="h-11"
              />
              <p id="name-help" className="text-xs text-muted-foreground">
                Please use your name in any language.
              </p>
              <FieldError field="name" error={errors.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Company or organization <RequiredMark />
              </Label>
              <Input
                {...controlProps('company')}
                required
                autoComplete="organization"
                value={form.company}
                onChange={(event) => updateField('company', event.target.value)}
                maxLength={QUOTE_LIMITS.company}
                className="h-11"
              />
              <FieldError field="company" error={errors.company} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email address <RequiredMark />
              </Label>
              <Input
                {...controlProps('email')}
                required
                type="email"
                autoComplete="email"
                placeholder="buyer@yourbusiness.com"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                maxLength={QUOTE_LIMITS.email}
                className="h-11"
              />
              <FieldError field="email" error={errors.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone number{' '}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                {...controlProps('phone')}
                type="tel"
                autoComplete="tel"
                placeholder="Include country code"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                maxLength={QUOTE_LIMITS.phone}
                className="h-11"
              />
              <FieldError field="phone" error={errors.phone} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyerType">
              Buyer type <RequiredMark />
            </Label>
            <select
              {...controlProps('buyerType')}
              required
              value={form.buyerType}
              onChange={(event) => updateField('buyerType', event.target.value)}
              className={selectClassName}
            >
              <option value="">Select your business type</option>
              {BUYER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError field="buyerType" error={errors.buyerType} />
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-border pt-6">
          <legend className="mb-3 pr-4 text-sm font-semibold">
            <span className="mr-2 text-muted-foreground">02</span> Products
            &amp; delivery
          </legend>
          <div className="space-y-2">
            <Label htmlFor="product">
              Product of interest <RequiredMark />
            </Label>
            <select
              {...controlProps('product', 'product-help')}
              required
              value={form.product}
              onChange={(event) => updateField('product', event.target.value)}
              className={selectClassName}
            >
              <option value="">Choose a product</option>
              {quoteProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <p
              id="product-help"
              className="text-xs leading-relaxed text-muted-foreground"
            >
              {selectedProduct
                ? selectedProduct.packages.length
                  ? `Catalog pack sizes: ${selectedProduct.packages.map((pack) => pack.weight).join(', ')}. Availability is confirmed by KFoods.`
                  : 'Fresh fruit and dry-fruit partner range. Format, availability and commercial terms are confirmed by KFoods for each enquiry.'
                : 'Choose a catalog product. You can list other products in additional details.'}
            </p>
            <FieldError field="product" error={errors.product} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">
                Estimated quantity <RequiredMark />
              </Label>
              <Input
                {...controlProps('quantity', 'quantity-help')}
                required
                placeholder="e.g. 20 cases, or Not sure yet"
                value={form.quantity}
                onChange={(event) =>
                  updateField('quantity', event.target.value)
                }
                maxLength={QUOTE_LIMITS.quantity}
                className="h-11"
              />
              <p id="quantity-help" className="text-xs text-muted-foreground">
                Include units if known. No order commitment.
              </p>
              <FieldError field="quantity" error={errors.quantity} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packFormat">
                Preferred pack size{' '}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                {...controlProps('packFormat')}
                placeholder="e.g. 20 lb bags"
                value={form.packFormat}
                onChange={(event) =>
                  updateField('packFormat', event.target.value)
                }
                maxLength={QUOTE_LIMITS.packFormat}
                className="h-11"
              />
              <FieldError field="packFormat" error={errors.packFormat} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">
              Delivery destination <RequiredMark />
            </Label>
            <Input
              {...controlProps('destination', 'destination-help')}
              required
              placeholder="City, state / province, ZIP / postal code"
              value={form.destination}
              onChange={(event) =>
                updateField('destination', event.target.value)
              }
              maxLength={QUOTE_LIMITS.destination}
              className="h-11"
            />
            <p id="destination-help" className="text-xs text-muted-foreground">
              Include the country for destinations outside the United States.
            </p>
            <FieldError field="destination" error={errors.destination} />
          </div>
        </fieldset>

        <details className="rounded-lg border border-border p-4">
          <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            More buying details{' '}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </summary>
          <div className="mt-6 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country / region</Label>
                <Input
                  {...controlProps('country')}
                  autoComplete="country-name"
                  placeholder="United States, Canada…"
                  value={form.country}
                  onChange={(event) =>
                    updateField('country', event.target.value)
                  }
                  maxLength={QUOTE_LIMITS.country}
                  className="h-11"
                />
                <FieldError field="country" error={errors.country} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Order frequency</Label>
                <Input
                  {...controlProps('frequency')}
                  placeholder="One-time, monthly, or exploring"
                  value={form.frequency}
                  onChange={(event) =>
                    updateField('frequency', event.target.value)
                  }
                  maxLength={QUOTE_LIMITS.frequency}
                  className="h-11"
                />
                <FieldError field="frequency" error={errors.frequency} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incoterm">Target Incoterm</Label>
                <select
                  {...controlProps('incoterm')}
                  value={form.incoterm}
                  onChange={(event) =>
                    updateField('incoterm', event.target.value)
                  }
                  className={selectClassName}
                >
                  <option value="">Not specified / please advise</option>
                  {INCOTERMS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
                <FieldError field="incoterm" error={errors.incoterm} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="launchDate">Target launch / order date</Label>
                <Input
                  {...controlProps('launchDate')}
                  type="date"
                  value={form.launchDate}
                  onChange={(event) =>
                    updateField('launchDate', event.target.value)
                  }
                  className="h-11"
                />
                <FieldError field="launchDate" error={errors.launchDate} />
              </div>
            </div>
            <fieldset
              aria-describedby="certifications-help"
              className="space-y-3"
            >
              <legend className="mb-2 text-sm font-medium">
                Certification requirements for your order
              </legend>
              <p
                id="certifications-help"
                className="text-xs leading-relaxed text-muted-foreground"
              >
                These are your requirements, not claims that KFoods or its
                products hold these certifications. KFoods must confirm
                availability and provide applicable documentation.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {CERTIFICATION_REQUIREMENTS.map((certification, index) => (
                  <label
                    key={certification}
                    className="flex min-h-10 items-center gap-3 text-sm"
                  >
                    <input
                      id={
                        index === 0
                          ? 'certifications'
                          : `certification-${index}`
                      }
                      type="checkbox"
                      name="certifications"
                      value={certification}
                      checked={form.certifications.includes(certification)}
                      onChange={(event) =>
                        updateField(
                          'certifications',
                          event.target.checked
                            ? [...form.certifications, certification]
                            : form.certifications.filter(
                                (value) => value !== certification,
                              ),
                        )
                      }
                      aria-invalid={Boolean(errors.certifications)}
                      aria-describedby={
                        errors.certifications
                          ? 'certifications-help certifications-error'
                          : 'certifications-help'
                      }
                      className="size-4 accent-primary"
                    />
                    {certification}
                  </label>
                ))}
              </div>
              <FieldError
                field="certifications"
                error={errors.certifications}
              />
            </fieldset>
            <fieldset
              aria-invalid={Boolean(errors.sampleRequest)}
              aria-describedby={
                errors.sampleRequest ? 'sampleRequest-error' : undefined
              }
              className="space-y-3"
            >
              <legend className="mb-2 text-sm font-medium">
                Would you like to ask about samples?
              </legend>
              <div className="flex gap-6">
                {['Yes', 'No'].map((option, index) => (
                  <label
                    key={option}
                    className="flex min-h-10 items-center gap-2 text-sm"
                  >
                    <input
                      id={index === 0 ? 'sampleRequest' : 'sampleRequest-no'}
                      type="radio"
                      name="sampleRequest"
                      value={option}
                      checked={form.sampleRequest === option}
                      onChange={(event) =>
                        updateField('sampleRequest', event.target.value)
                      }
                      aria-describedby={
                        errors.sampleRequest ? 'sampleRequest-error' : undefined
                      }
                      className="size-4 accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <FieldError field="sampleRequest" error={errors.sampleRequest} />
            </fieldset>
          </div>
        </details>

        <div className="space-y-2">
          <Label htmlFor="message">
            Additional details{' '}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Textarea
            {...controlProps('message', 'message-help')}
            placeholder="Other products, preferred packaging, or questions for our team."
            rows={4}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            maxLength={QUOTE_LIMITS.message}
          />
          <p id="message-help" className="text-xs text-muted-foreground">
            Up to {QUOTE_LIMITS.message} characters. Do not include payment
            information or sensitive documents.
          </p>
          <FieldError field="message" error={errors.message} />
        </div>

        <div className="space-y-3 border-t border-border pt-6">
          <Button type="submit" size="lg" className="h-12 w-full sm:w-auto">
            Prepare email draft{' '}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            This step only prepares text in your browser. It does not send an
            inquiry or place an order. Keep this tab open to retain your
            details.
          </p>
        </div>
      </form>

      {draft && (
        <section
          aria-labelledby="draft-heading"
          className="mt-8 space-y-5 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6"
        >
          <div>
            <h3
              ref={draftHeading}
              tabIndex={-1}
              id="draft-heading"
              className="scroll-mt-28 font-serif text-2xl font-semibold outline-none"
            >
              Your email draft is ready — not sent.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Review the draft below, then choose how to open it. You must press
              Send in your email app. This website cannot confirm delivery.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-draft">Email draft to {draft.to}</Label>
            <Textarea
              ref={draftText}
              id="quote-draft"
              readOnly
              value={draft.text}
              rows={12}
              className="bg-background text-sm"
              onFocus={(event) => event.currentTarget.select()}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-11">
              <a
                href={draft.mailtoUrl}
                onClick={() =>
                  setStatus(
                    'Email app requested. If it did not open, copy or download the draft below. Nothing has been sent by this website.',
                  )
                }
              >
                <Mail aria-hidden="true" />
                Open in my email app
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={copyDraft}
            >
              <Copy aria-hidden="true" />
              Copy draft
            </Button>
            <Button asChild variant="outline" className="h-11">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(draft.text)}`}
                download="kfoods-inquiry.txt"
              >
                <Download aria-hidden="true" />
                Download .txt
              </a>
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            No email app, or a draft that opens incomplete? Copy or download the
            full text and email it to {QUOTE_EMAIL}. Your form stays above;
            editing any field replaces this draft when you prepare it again.
          </p>
          <details className="border-t border-primary/15 pt-4">
            <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              Use Gmail instead
            </summary>
            <p
              id="gmail-disclosure"
              className="mb-3 mt-3 text-sm leading-relaxed text-muted-foreground"
            >
              The link below shares this draft with Google and opens Gmail in a
              new tab. You may need to sign in. Nothing is sent until you review
              the email and press Send in Gmail.
            </p>
            <Button asChild variant="outline" className="h-11">
              <a
                href={draft.gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby="gmail-disclosure"
                onClick={() =>
                  setStatus(
                    'Gmail draft requested in a new tab. Review it and press Send there if you choose. This website cannot confirm delivery.',
                  )
                }
              >
                <ExternalLink aria-hidden="true" />
                Open Gmail draft (new tab)
              </a>
            </Button>
          </details>
        </section>
      )}
      <p
        role="status"
        aria-live="polite"
        className={
          status ? 'mt-4 text-sm leading-relaxed text-primary' : 'sr-only'
        }
      >
        {status}
      </p>
    </div>
  )
}

export function QuoteBenefits() {
  return (
    <ol className="space-y-6">
      {[
        {
          Icon: FileText,
          title: 'Share your buying brief',
          description:
            'Choose a product, an estimated quantity and a delivery destination.',
        },
        {
          Icon: Check,
          title: 'Review before sharing',
          description:
            'Your details stay in this page until you choose an email option.',
        },
        {
          Icon: Mail,
          title: 'Send from your email',
          description:
            'Ask KFoods to confirm pricing, stock, order terms and any documents you need.',
        },
      ].map(({ Icon, title, description }, index) => (
        <li key={title} className="flex gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
            <Icon aria-hidden="true" className="size-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">
              <span className="sr-only">Step {index + 1}: </span>
              {title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
