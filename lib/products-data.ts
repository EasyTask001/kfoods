export type ProductCategory = 'dals' | 'rice'

export interface PackageOption {
  weight: string
  price?: string
  inStock: boolean
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  longDescription: string
  image: string
  packages: PackageOption[]
  nutritionHighlights: string[]
  cookingTips?: string[]
}

export const dalsProducts: Product[] = [
  {
    id: 'moong-dal',
    name: 'Moong Dal',
    category: 'dals',
    description: 'Golden split mung beans, a protein-rich superfood perfect for soups and curries.',
    longDescription: 'Our premium Moong Dal (split mung beans) is carefully selected and processed to deliver exceptional quality. Known for its mild, slightly sweet flavor and quick cooking time, it\'s a staple in healthy cooking. Rich in protein, fiber, and essential nutrients, Moong Dal is easily digestible and perfect for wholesome family meals.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Moong%20Dal-ROra22FADCRq3ntqjAgiueATZCzDgt.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in plant-based protein',
      'Excellent source of dietary fiber',
      'Rich in B vitamins and minerals',
      'Low glycemic index'
    ],
    cookingTips: [
      'Rinse thoroughly before cooking',
      'Cooks in 20-25 minutes without pre-soaking',
      'Perfect for soups, stews, and dal recipes',
      'Can be sprouted for salads'
    ]
  },
  {
    id: 'whole-moong-dal',
    name: 'Whole Moong Dal',
    category: 'dals',
    description: 'Premium whole green mung beans with earthy flavour, 100% natural and farm-fresh.',
    longDescription: 'Our Whole Moong Dal features premium quality whole green mung beans sourced from the finest farms. These 100% natural beans have a satisfying earthy flavour and are packed with plant protein, vitamins, and minerals. They cook to a beautifully tender texture and are perfect for sprouting, soups, or traditional whole-bean curries.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whole%20Moong%20Dal%20-%20Premium-aNXYhh0dbZtMndbCX4jxmDn8cfeVuD.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true }
    ],
    nutritionHighlights: [
      '100% natural whole grain',
      'High in plant-based protein',
      'Rich in antioxidants and vitamins',
      'Excellent for sprouting'
    ],
    cookingTips: [
      'Soak overnight for best results',
      'Cooks in 30-40 minutes after soaking',
      'Perfect for whole-bean curries and soups',
      'Sprout for nutrient-dense salads'
    ]
  },
  {
    id: 'whole-moong-small-dal',
    name: 'Whole Moong Small Dal',
    category: 'dals',
    description: 'Small-variety whole green mung beans with concentrated flavour and quick cooking.',
    longDescription: 'Our Whole Moong Small Dal is a smaller variety of whole mung bean that cooks faster and has a more concentrated, earthy flavour. These vibrant green beans are perfect for quick weeknight meals without requiring long soaking times. Loaded with protein and micronutrients, they are a nutritious everyday staple.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whole%20Moong%20Small%20Dal-DR2LO26MMPfsyR1JtKPXbYPWJQ4Wzl.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Smaller variety, concentrated flavour',
      'High in protein and fibre',
      'Rich in potassium and magnesium',
      'Quick-cooking convenience'
    ],
    cookingTips: [
      'Soak for 2-4 hours for faster cooking',
      'Cooks in 20-30 minutes after soaking',
      'Perfect for everyday meals',
      'Great for light soups and stews'
    ]
  },
  {
    id: 'chana-dal',
    name: 'Chana Dal',
    category: 'dals',
    description: 'Split chickpeas with a nutty flavour and firm texture, ideal for hearty dishes.',
    longDescription: 'Chana Dal is made from split baby chickpeas, offering a rich, nutty flavour and satisfying texture. It holds its shape well during cooking, making it perfect for stews, soups, and traditional preparations. High in protein and fibre, it\'s a nutritious choice for vegetarian and vegan diets.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chana%20Dal-QYlL9QW0QlcKbc7CcZXj4lxzgl07uw.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Rich in protein and complex carbs',
      'High fibre content aids digestion',
      'Contains iron and folate',
      'Supports heart health'
    ],
    cookingTips: [
      'Soak for 30 minutes for faster cooking',
      'Cooks in 30-40 minutes',
      'Great for thick soups and curries',
      'Can be ground into flour for baking'
    ]
  },
  {
    id: 'kala-chana',
    name: 'Kala Chana',
    category: 'dals',
    description: 'Dark brown chickpeas with robust flavour, packed with iron and plant protein.',
    longDescription: 'Kala Chana (black chickpeas) are a nutritional powerhouse with a robust, earthy flavour that is richer and more intense than regular chickpeas. Sourced from the finest farms, our Kala Chana is cleaned and graded for consistent quality. High in iron, protein, and complex carbohydrates, they are a staple in traditional cooking and perfect for curries, chaats, and salads.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kala%20Chana-SoIyzCRvBctbQU5qapLJ4BydLlx8F8.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in iron and plant protein',
      'Rich in complex carbohydrates',
      'Excellent source of dietary fibre',
      'Supports blood sugar balance'
    ],
    cookingTips: [
      'Soak overnight for best results',
      'Pressure cook for 15-20 minutes',
      'Perfect for curries and chaats',
      'Great for sprouting and salads'
    ]
  },
  {
    id: 'masoor-dal',
    name: 'Masoor Dal',
    category: 'dals',
    description: 'Red lentils that cook quickly into a creamy, comforting dish packed with nutrients.',
    longDescription: 'Masoor Dal, or red lentils, is prized for its quick cooking time and smooth, creamy texture. It breaks down beautifully when cooked, creating naturally thick and satisfying dishes. An excellent source of plant-based protein and iron, it\'s perfect for busy weeknight meals.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Masoor%20Dal-88gNfMKDIG44HAFZ7HdgwvG2fBd9U5.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Quick-cooking protein source',
      'High in iron and folate',
      'Supports muscle health',
      'Heart-healthy and cholesterol-free'
    ],
    cookingTips: [
      'No soaking required',
      'Cooks in just 15-20 minutes',
      'Perfect for quick weeknight dinners',
      'Naturally thickens soups and stews'
    ]
  },
  {
    id: 'whole-masoor-dal',
    name: 'Whole Masoor Dal',
    category: 'dals',
    description: 'Whole brown lentils with earthy depth and superior nutritional integrity.',
    longDescription: 'Our Whole Masoor Dal (whole brown lentils) retains its natural skin, which adds depth of flavour and preserves maximum nutritional value. These lentils have a robust, earthy taste and hold their shape better than split varieties, making them perfect for hearty soups, stews, and salads. A rich source of protein, fibre, and essential minerals.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whole%20Masoor%20Dal-CQJkErPsaWiZS1CeGf0Ve8tfAxi6x0.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Whole grain with skin intact',
      'Higher fibre than split varieties',
      'Rich in iron and B vitamins',
      'Holds shape in hearty stews'
    ],
    cookingTips: [
      'Soak for 1-2 hours for faster cooking',
      'Cooks in 25-35 minutes',
      'Ideal for hearty soups and stews',
      'Excellent in warm salads'
    ]
  },
  {
    id: 'rajma-jammu',
    name: 'Rajma Jammu',
    category: 'dals',
    description: 'Small, intensely flavoured Jammu kidney beans — the king of rajma curries.',
    longDescription: 'Rajma Jammu is the most prized variety of red kidney beans, sourced from the foothills of Jammu. Smaller and more intensely flavoured than regular rajma, these beans have a distinctive taste that is the hallmark of the famous Rajma Chawal. When cooked, they become incredibly tender while absorbing spices beautifully, creating rich, deeply satisfying curries.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajma%20Jammu-VqA3OtjPMAqJHTReWLHug1cidNLs4M.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and complex carbs',
      'Excellent source of dietary fibre',
      'Rich in iron and potassium',
      'Supports heart and digestive health'
    ],
    cookingTips: [
      'Soak overnight — essential for this variety',
      'Pressure cook for 20-25 minutes',
      'Perfect for classic Rajma Chawal',
      'Absorbs spices for deep, rich flavour'
    ]
  },
  {
    id: 'urad-dal',
    name: 'Urad Dal',
    category: 'dals',
    description: 'Creamy white split urad lentils with a rich flavour, ideal for dals and batters.',
    longDescription: 'Our Urad Dal (split white lentils) is known for its rich, creamy texture and distinctive earthy flavour. When cooked, it creates luxuriously smooth dishes and is also widely used in batters for dosas and idlis. High in protein, calcium, and iron, Urad Dal is especially valued for its nutritional density and its natural ability to create creamy, satisfying meals.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Urad%20Dal-RqJPKkWbyKIrhrIj3nItyWgF4oM6yR.jpeg',
    packages: [
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and calcium',
      'Rich in iron for energy',
      'Contains essential B vitamins',
      'Supports bone and muscle health'
    ],
    cookingTips: [
      'Soak for 2-4 hours recommended',
      'Cooks in 30-40 minutes',
      'Creates naturally creamy dishes',
      'Excellent for dosa and idli batters'
    ]
  },
  {
    id: 'urad-dal-split',
    name: 'Urad Dal Split',
    category: 'dals',
    description: 'Split urad lentils with skin removed, delivering a milder, creamier texture.',
    longDescription: 'Urad Dal Split (skinned and split) has the skin removed to deliver a lighter, creamier flavour compared to whole urad. It cooks faster and produces a silky-smooth texture that is perfect for creamy dals and batters for traditional dishes like dosas and vadas. Rich in protein and calcium, it is an everyday kitchen essential.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Urad%20Dal%20Split-CQiHjtrkn45AczRtefauaXnuTJF95J.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Skinned for milder, creamier taste',
      'High in protein and calcium',
      'Quick-cooking convenience',
      'Perfect for batters and dals'
    ],
    cookingTips: [
      'Minimal soaking needed (30 mins)',
      'Cooks in 20-25 minutes',
      'Ideal for dosa and idli batters',
      'Makes silky smooth dals'
    ]
  },
  {
    id: 'urad-gota',
    name: 'Urad Gota',
    category: 'dals',
    description: 'Whole skinned urad lentils with a delicate creamy flavour and firm bite.',
    longDescription: 'Urad Gota are whole urad lentils with the skin removed, offering a delicate, creamy flavour with a satisfying firm bite. They are versatile and used in everything from rich dals to crunchy tempering in South cuisine. Available in sizes up to 55 lb for wholesale needs, our Urad Gota meets the highest quality standards.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Urad%20Gota-L07mPu1c1PWYDzP5RZYfMZyWZ8tUC1.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Whole skinned for firm texture',
      'High in protein and minerals',
      'Rich in calcium and phosphorus',
      'Versatile culinary applications'
    ],
    cookingTips: [
      'Soak for 4-6 hours before cooking',
      'Cooks in 35-45 minutes',
      'Great for rich creamy dals',
      'Use whole in tempering for crunch'
    ]
  },
  {
    id: 'whole-urad-dal',
    name: 'Whole Urad Dal',
    category: 'dals',
    description: 'Whole black urad lentils with skin intact, the base of the iconic Dal Makhani.',
    longDescription: 'Whole Urad Dal (whole black lentils with skin) is the prized ingredient behind the iconic Dal Makhani. The skin adds deep colour, earthy complexity, and extra fibre. Our premium whole urad is cleaned and sorted for uniform quality. Slow-cooked, it produces a richly flavoured, velvety dal unlike any other. Available in 2 lb, 4 lb, and 8 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whole%20Urad%20Dal-bOrfQBZmVImDiYsDIDf7YFE2p8dSpu.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Whole grain with skin for maximum fibre',
      'Rich in iron, calcium, and protein',
      'Prebiotic fibre supports gut health',
      'Dense, slow-release energy source'
    ],
    cookingTips: [
      'Soak overnight — essential',
      'Slow cook or pressure cook for 30-40 mins',
      'Perfect for Dal Makhani',
      'Pairs beautifully with cream and butter'
    ]
  },
  {
    id: 'red-chori',
    name: 'Red Chori',
    category: 'dals',
    description: 'Small, vibrant red adzuki-style beans with a rich earthy flavour — a South Asian staple.',
    longDescription: 'Red Chori (red cowpea / adzuki-style beans) are small, vibrantly coloured red beans cherished across South Asian cooking for their rich, earthy flavour and satisfying bite. They absorb spices beautifully and cook to a tender yet firm texture. Excellent in traditional curries, chaats, and rice dishes. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-02%20at%2010.16.28%20AM-n69miL5ThFLfif4iyzm7VuPdWe3NDB.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in plant protein and fibre',
      'Rich in iron and potassium',
      'Good source of complex carbohydrates',
      'Supports heart and digestive health'
    ],
    cookingTips: [
      'Soak for 2–4 hours before cooking',
      'Cooks in 30–35 minutes after soaking',
      'Pairs well with onion and tomato masala',
      'Great in chaats and warm salads'
    ]
  },
  {
    id: 'brown-chori',
    name: 'Brown Chori',
    category: 'dals',
    description: 'Small round brown cowpea beans with a mild, nutty taste and excellent nutritional profile.',
    longDescription: 'Brown Chori are small, round cowpea-type beans with a pleasant mild, nutty flavour. Packed with plant-based protein and fibre, they are a nutritional staple popular across North India and Pakistan. They cook relatively quickly for their size and work beautifully in spiced curries, light stews, and hearty dals. Available in a 2 lb pack.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brown%20Chori-xRAuzEgvQYKsCwwcHm6173pmp7uYqK.jpeg',
    packages: [
      { weight: '2 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and dietary fibre',
      'Good source of iron and zinc',
      'Low glycemic index',
      'Rich in B vitamins'
    ],
    cookingTips: [
      'Soak for 2–3 hours before cooking',
      'Cooks in 25–30 minutes after soaking',
      'Excellent in spiced curries and stews',
      'Can be sprouted for added nutrition'
    ]
  },
  {
    id: 'dark-red-kidney-beans',
    name: 'Dark Red Kidney Beans',
    category: 'dals',
    description: 'Deep burgundy kidney beans with a robust flavour — the authentic Rajma of North India.',
    longDescription: 'Our Dark Red Kidney Beans (Rajma) are large, deep-burgundy beans with a meaty texture and bold, robust flavour. These are the authentic beans behind the beloved North Indian Rajma curry. When slow-cooked, they develop a wonderfully creamy interior while holding their shape, soaking up spiced gravies perfectly. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dark%20Red%20Kidney%20Beans-aPEF9rb5DQfx50LdVnlW8x6LO3t2Bi.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and complex carbs',
      'Rich in iron and folate',
      'Excellent source of dietary fibre',
      'Supports heart and muscle health'
    ],
    cookingTips: [
      'Soak overnight — essential for safety',
      'Boil vigorously for 10 mins before simmering',
      'Pressure cook for 20–25 minutes',
      'Classic for Rajma Chawal'
    ]
  },
  {
    id: 'light-red-kidney-beans',
    name: 'Light Red Kidney Beans',
    category: 'dals',
    description: 'Tender light-coloured kidney beans with a mild flavour — versatile and nutritious.',
    longDescription: 'Light Red Kidney Beans are a milder, more tender variety of kidney bean with a pinkish-red hue and creamy interior. They are slightly softer than dark red kidney beans and have a more delicate, subtler flavour, making them versatile for a wide range of dishes from curries and soups to chilli and salads. Available in 2 lb, 4 lb, and bulk 55 lb bags.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Light%20Red%20Kidney%20Beans-gBHniGxIFxkOft46XhOhS3uO7Stkiq.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '55 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and complex carbohydrates',
      'Excellent source of fibre and folate',
      'Rich in iron and potassium',
      'Low in fat and cholesterol-free'
    ],
    cookingTips: [
      'Soak overnight before cooking',
      'Boil vigorously for 10 minutes first',
      'Cooks in 45–60 minutes',
      'Great for chilli, soups, and curries'
    ]
  },
  {
    id: 'rajma-chitra',
    name: 'Rajma Chitra',
    category: 'dals',
    description: 'Speckled pinto-style rajma with a creamy texture and rich, hearty flavour.',
    longDescription: 'Rajma Chitra (speckled kidney beans / pinto-style rajma) are beautifully patterned beans with earthy brown speckles on a cream background. They have a wonderfully creamy texture when cooked and a rich, hearty flavour that makes for deeply satisfying curries. Highly popular in Punjabi cooking, they are excellent for the classic Rajma dish. Available in a 4 lb pack.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajma%20Chitra-FuDPlCUwSR2B8b55pL0eJaWwTXQnfI.jpeg',
    packages: [
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in protein and complex carbs',
      'Rich in fibre for digestive health',
      'Contains iron and magnesium',
      'Traditional Punjabi superfood'
    ],
    cookingTips: [
      'Soak overnight for best results',
      'Pressure cook for 15–20 minutes',
      'Perfect for traditional Rajma curry',
      'Pairs beautifully with steamed basmati rice'
    ]
  },
  {
    id: 'black-eye-peas',
    name: 'Black Eye Peas',
    category: 'dals',
    description: 'Cream-coloured cowpeas with a distinctive black eye — earthy, tender, and versatile.',
    longDescription: 'Black Eye Peas (lobia) are cream-coloured beans with a characteristic black eye spot and a pleasant, earthy flavour. They are prized across South Asian and international cuisines for their tender texture and mild taste. Quick-cooking compared to other beans, they work beautifully in curries, rice dishes, and salads. A nutritional powerhouse rich in protein and fibre. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Eye%20Peas-uCjyEEQUwDx9YQ1tJgMWGosILgncXT.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Rich in folate and plant protein',
      'Good source of iron and potassium',
      'High fibre supports digestive health',
      'Low glycemic index'
    ],
    cookingTips: [
      'Soak for 4–6 hours or overnight',
      'Cooks in 30–40 minutes after soaking',
      'Excellent in lobia curry and rice',
      'Works well in salads and soups'
    ]
  },
  {
    id: 'yellow-vatana',
    name: 'Yellow Vatana',
    category: 'dals',
    description: 'Whole dried yellow peas with a sweet, earthy flavour — popular for Mumbai street food.',
    longDescription: 'Yellow Vatana are whole dried yellow peas celebrated as the main ingredient in Mumbai\'s iconic Ragda Pattice and Ragda Samosa. They have a sweet, mild earthy flavour and cook to a wonderfully soft, almost buttery texture. Nutritious and filling, they are a beloved staple across western and northern Indian cooking. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Vatana-g6CpusRduv131qXVSD0T7PVy65WDdv.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'High in plant protein and fibre',
      'Rich in iron and potassium',
      'Good source of vitamins B1 and B6',
      'Supports energy and digestive health'
    ],
    cookingTips: [
      'Soak overnight for even cooking',
      'Pressure cook for 15–20 minutes',
      'Perfect for Ragda Pattice and curries',
      'Can be spiced and served as chaat'
    ]
  },
  {
    id: 'yellow-split-peas',
    name: 'Yellow Split Peas',
    category: 'dals',
    description: 'Bright golden split peas with a mild, sweet flavour — quick-cooking and highly nutritious.',
    longDescription: 'Yellow Split Peas are hulled and split field peas with a bright golden colour and pleasantly mild, slightly sweet flavour. They cook quickly without pre-soaking and break down into a naturally creamy, thick texture — ideal for soups, dals, and side dishes. A favourite across South Asian, European, and Caribbean cuisines for their versatility and excellent nutrition. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Split%20Peas-rMZa5PtYXoiQTpPxHoKVF1Q08bt6Zv.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'No pre-soaking required',
      'High in protein and soluble fibre',
      'Rich in iron and B vitamins',
      'Naturally low in fat'
    ],
    cookingTips: [
      'No soaking required',
      'Cooks in 20–30 minutes',
      'Breaks down naturally for thick soups',
      'Perfect for split pea soup and dal'
    ]
  },
  {
    id: 'whole-moth',
    name: 'Whole Moth',
    category: 'dals',
    description: 'Tan-coloured moth beans — drought-resistant, high-protein, and ideal for sprouting.',
    longDescription: 'Whole Moth (matki) are small, oval, tan-coloured beans that are exceptionally high in protein and nutrients. Known for their firm texture and subtly nutty flavour, they are widely used in traditional dishes like Misal Pav, dal curries, and chaats. Moth beans are excellent for sprouting — their sprouts are crispy, nutritious, and widely used in health-conscious cooking. Available in 2 lb and 4 lb packs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whole%20Moth-9nbNFEaw6c7iJlIjlGV3PvHpocmpxm.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Very high in plant-based protein',
      'Excellent for sprouting',
      'Rich in iron and calcium',
      'High fibre supports gut health'
    ],
    cookingTips: [
      'Soak overnight for best results',
      'Cooks in 35–45 minutes after soaking',
      'Sprout for 1–2 days for crispy, nutritious sprouts',
      'Classic for Misal Pav and chaat'
    ]
  },
  {
    id: 'toor-dal',
    name: 'Toor Dal',
    category: 'dals',
    description: 'Yellow pigeon peas with a mild taste, a staple for everyday cooking.',
    longDescription: 'Toor Dal (pigeon peas) is a kitchen staple known for its mild flavour and versatile nature. It has a smooth texture when cooked and blends beautifully with spices. Rich in protein and essential amino acids, it\'s a cornerstone of healthy, balanced meals.',
    image: '/toor-dal.webp',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '4 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Excellent protein and amino acids',
      'Rich in potassium and magnesium',
      'Supports digestive health',
      'Low in fat, high in nutrients'
    ],
    cookingTips: [
      'Rinse well before cooking',
      'Cooks in 25-30 minutes',
      'Pairs well with all spices',
      'Great for daily meals'
    ]
  }
]

export const riceProducts: Product[] = [
  {
    id: 'kartarpur-authentic-long-grain',
    name: 'Kartarpur Authentic Basmati Rice (Long Grain)',
    category: 'rice',
    description: 'Classic long grain basmati aged to perfection — fluffy, fragrant, and naturally aromatic.',
    longDescription: 'Kartarpur Authentic Basmati Rice (Long Grain) is sourced from the finest basmati fields and aged carefully to develop its characteristic fragrance and fluffy texture. Each long grain cooks separately, delivering the perfect base for biryanis, pulaos, and everyday South Asian meals. Available in convenient packs from 2 lb all the way up to a premium 20 lb burlap sack.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Authentic%20Basmati%20Rice%20%28Long%20Grain%29-LNRLvQ6cZ6GN8655AfiKhPBsXaqRSQ.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '8 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Aged for enhanced aroma and flavour',
      'Long grain cooks fluffy and separate',
      'Gluten-free and low in fat',
      'Rich in complex carbohydrates'
    ],
    cookingTips: [
      'Rinse until water runs clear',
      'Use 1.5 cups water per cup of rice',
      'Let rest 5 minutes after cooking',
      'Perfect for biryani and everyday meals'
    ]
  },
  {
    id: 'kartarpur-authentic-extra-long-grain',
    name: 'Kartarpur Authentic Basmati Rice (Extra Long Grain)',
    category: 'rice',
    description: 'Premium extra long grain basmati — grains elongate up to twice their length when cooked.',
    longDescription: 'Kartarpur Authentic Basmati Rice (Extra Long Grain) is our premium white basmati, featuring grains that are extra long and elongate impressively upon cooking. Aged to perfection, this rice delivers an irresistible aroma, silky texture, and impeccable presentation — making it the ideal choice for special occasion biryanis and guest meals. Available from 1.5 lb bags up to a 40 lb bulk sack.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarput%20Authentic%20Basmati%20Rice%20%28Extra%20Long%20Grain%29-4Gml4HL6sD7gMuz9Zt4ApIZvmgiLyK.jpeg',
    packages: [
      { weight: '1.5 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '40 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Extra-long grain for premium presentation',
      'Aged for exceptional aroma',
      'Gluten-free, low fat and sodium',
      'Rich in essential carbohydrates'
    ],
    cookingTips: [
      'Soak for 20 minutes before cooking',
      'Use 1.5 cups water per cup of rice',
      'Steam over low heat for best results',
      'Ideal for festive biryanis and pulaos'
    ]
  },
  {
    id: 'kartarpur-sella-extra-long-grain',
    name: 'Kartarpur Sella Basmati Rice (Extra Long Grain)',
    category: 'rice',
    description: 'Parboiled sella basmati with extra-long grains — firm, non-sticky, and nutritious.',
    longDescription: 'Kartarpur Sella Basmati Rice (Extra Long Grain) is a parboiled white basmati that retains more nutrients than regular milled rice. The sella process gives each grain a firmer texture and ensures they remain perfectly separate after cooking. Its extra-long grains and clean, mild flavour make it an outstanding choice for restaurant-style rice dishes and large family meals. Available in 2 lb, 10 lb, and 40 lb.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Sella%20Basmati%20Rice%20Extra%20Long%20Grain-lISJcFBHlp9uxwEWcjcLbByEwnBzCO.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '40 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Parboiled for extra nutrient retention',
      'Firm non-sticky texture',
      'Extra-long grain premium variety',
      'Excellent for meal prep and reheating'
    ],
    cookingTips: [
      'No pre-soaking required',
      'Use 1.75 cups water per cup of rice',
      'Cooks in 20–25 minutes',
      'Perfect for dum biryani and fried rice'
    ]
  },
  {
    id: 'kartarpur-golden-sella',
    name: 'Kartarpur Golden Sella Basmati Rice (Extra Long Grain)',
    category: 'rice',
    description: 'Golden parboiled basmati with a rich hue, firm grains, and exceptional aroma.',
    longDescription: 'Kartarpur Golden Sella Basmati Rice is a premium parboiled basmati that derives its characteristic golden colour from the steam-parboiling process. This process drives nutrients deep into the grain and produces a distinctively rich aroma. The extra-long grains cook firm, separate, and beautifully golden — making this variety highly prized for professional kitchens and premium home cooking. Available in a 20 lb burlap sack, aged to perfection.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Golden%20Sella%20Basmati%20Rice%20Extra%20Long%20Grain-qgIBL4UVs7JblMvaNNYNK1JzCRDMZi.jpeg',
    packages: [
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Golden parboiled for richer nutrients',
      'Extra-long grain with firm texture',
      'Higher vitamin B content than white rice',
      'Aged for superior aroma and flavour'
    ],
    cookingTips: [
      'Rinse once before cooking',
      'Use 2 cups water per cup of rice',
      'Cooks in 20–25 minutes',
      'Signature choice for Hyderabadi biryani'
    ]
  },
  {
    id: 'kartarpur-brown-basmati',
    name: 'Kartarpur Authentic Brown Basmati Rice',
    category: 'rice',
    description: 'Whole grain basmati with bran intact — nutty, nutritious, and rich in fibre.',
    longDescription: 'Kartarpur Authentic Brown Basmati Rice retains its natural bran layer, making it a whole grain powerhouse. With a satisfying nutty flavour and chewier texture, it offers significantly more fibre, vitamins, and minerals than white rice while still delivering basmati\'s signature fragrance. Ideal for health-conscious households and wellness-focused cooking. Available in a small bag, 21 lb, and 40 lb sacks.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Authentic%20Brown%20Basmati%20Rice-TuxEWYkpLgk9z7HTBdTnHiUJAJ4CtU.jpeg',
    packages: [
      { weight: '2 lb', inStock: true },
      { weight: '21 lb', inStock: true },
      { weight: '40 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Whole grain with bran intact',
      'High in dietary fibre and minerals',
      'Rich in B vitamins and antioxidants',
      'Lower glycemic index than white rice'
    ],
    cookingTips: [
      'Soak for 30 minutes before cooking',
      'Use 2.5 cups water per cup of rice',
      'Cooks in 40–45 minutes',
      'Perfect for grain bowls, salads, and healthy meals'
    ]
  },
  {
    id: 'kartarpur-basmati',
    name: 'Kartarpur Basmati Rice',
    category: 'rice',
    description: 'Signature extra long grain basmati, aged to perfection with iconic Kartarpur heritage.',
    longDescription: 'Kartarpur Basmati Rice is our flagship product — named after the historic city of Kartarpur and aged to develop its hallmark fragrance and extra-long grain that elongates up to twice its length when cooked. Sourced from the finest basmati-growing regions, each grain separates perfectly to deliver a fluffy, aromatic rice experience perfect for biryani, pulao, and everyday meals.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Basmati%20Rice-cPXf0epQjnc5jnWsimCpKIDrLxNxQ6.png',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Extra-long grain, aged to perfection',
      'Naturally aromatic and fluffy',
      'Low in fat and sodium',
      'Gluten-free premium grain'
    ],
    cookingTips: [
      'Rinse until water runs clear',
      'Use 1.5 cups water per cup of rice',
      'Let rest 5 minutes after cooking',
      'Perfect for biryani and pulao'
    ]
  },
  {
    id: 'basmati-rice-long-grain',
    name: 'Basmati Rice Long Grain',
    category: 'rice',
    description: 'Premium extra long grain basmati aged to perfection — fluffy, fragrant, and pure.',
    longDescription: 'Our Basmati Rice Long Grain is a premium quality extra-long grain basmati rice aged carefully to develop its irresistible aroma, fluffy texture, and exquisite taste. Harvested from the foothills and aged for a minimum of 10 months, this rice delivers unmatched flavour and aroma. Each grain elongates beautifully when cooked, remaining perfectly separate and fluffy. Available in 5 lb bags and a 20 lb burlap sack.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Basmati%20Rice%20Long%20Grain-0qsULH4SubpPkDYaDlZFOGX7kajliv.jpeg',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Extra-long grain premium quality',
      'Aged minimum 10 months',
      'Naturally aromatic, low in fat',
      'Gluten-free grain'
    ],
    cookingTips: [
      'Rinse until water runs clear',
      'Use 1.5 cups water per cup of rice',
      'Let rest 5 minutes after cooking',
      'Perfect for pilafs and biryanis'
    ]
  },
  {
    id: 'white-basmati',
    name: 'White Basmati Rice',
    category: 'rice',
    description: 'Premium aged white basmati with signature aroma and fluffy texture.',
    longDescription: 'Our White Basmati Rice is aged to perfection, developing its characteristic fragrant aroma and delicate flavour. Each grain elongates beautifully when cooked, remaining separate and fluffy. Ideal for everyday meals, special occasions, and all rice-based dishes. This versatile rice complements any cuisine.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%2020%2C%202026%2C%2010_20_14%20AM-Nl6Kk58CnUxex9pJp9CjHzsxBm85BV.png',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '20 lb', inStock: true },
      { weight: '40 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Long grain premium quality',
      'Naturally aromatic',
      'Low in fat and sodium',
      'Gluten-free grain'
    ],
    cookingTips: [
      'Rinse until water runs clear',
      'Use 1.5 cups water per cup of rice',
      'Let rest 5 minutes after cooking',
      'Perfect for pilafs and biryanis'
    ]
  },
  {
    id: 'brown-basmati',
    name: 'Brown Basmati Rice',
    category: 'rice',
    description: 'Whole grain basmati with nutty flavour and extra nutrition from the bran layer.',
    longDescription: 'Brown Basmati Rice retains its nutritious bran layer, offering more fibre, vitamins, and minerals than white rice. It has a slightly nutty flavour and chewier texture while maintaining basmati\'s signature aroma. Perfect for health-conscious consumers seeking whole grain options without sacrificing taste.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kartarpur%20Basmati%20Rice-cPXf0epQjnc5jnWsimCpKIDrLxNxQ6.png',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Whole grain with bran intact',
      'Higher fibre content',
      'Rich in minerals and B vitamins',
      'Lower glycemic index'
    ],
    cookingTips: [
      'Soak for 30 minutes for best results',
      'Use 2 cups water per cup of rice',
      'Cooks in 40-45 minutes',
      'Great for grain bowls and salads'
    ]
  },
  {
    id: 'sella-basmati',
    name: 'Golden Sella Basmati',
    category: 'rice',
    description: 'Parboiled basmati that stays firm and separate, perfect for fried rice and pilafs.',
    longDescription: 'Golden Sella Basmati is parboiled before milling, which drives nutrients into the grain and gives it a distinctive golden colour. This process makes the rice firmer and less sticky when cooked, perfect for dishes where you want grains to stay separate. It\'s more nutritious than regular white rice and has excellent reheating properties.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Basmati%20Rice%20Long%20Grain-0qsULH4SubpPkDYaDlZFOGX7kajliv.jpeg',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '20 lb', inStock: true },
      { weight: '40 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Parboiled for extra nutrients',
      'Retains more vitamins than white rice',
      'Firmer texture that holds shape',
      'Excellent for meal prep'
    ],
    cookingTips: [
      'Requires slightly more water',
      'Takes 20-25 minutes to cook',
      'Perfect for fried rice dishes',
      'Reheats exceptionally well'
    ]
  },
  {
    id: 'steam-basmati',
    name: 'Steam Basmati Rice',
    category: 'rice',
    description: 'Steamed basmati with enhanced aroma and extra-long grains for special occasions.',
    longDescription: 'Our Steam Basmati Rice undergoes a special steaming process that enhances its natural aroma and ensures extra-long grain elongation. This premium rice is perfect for special occasions and traditional preparations where presentation matters. It cooks to perfection with a light, fluffy texture and impressive grain length.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%2020%2C%202026%2C%2010_20_14%20AM-Nl6Kk58CnUxex9pJp9CjHzsxBm85BV.png',
    packages: [
      { weight: '5 lb', inStock: true },
      { weight: '10 lb', inStock: true },
      { weight: '20 lb', inStock: true }
    ],
    nutritionHighlights: [
      'Extra-long grain variety',
      'Enhanced natural aroma',
      'Premium quality for special meals',
      'Light and easy to digest'
    ],
    cookingTips: [
      'Rinse gently to preserve aroma',
      'Use 1.75 cups water per cup rice',
      'Perfect for celebrations',
      'Grains elongate up to twice their length'
    ]
  }
]

export const allProducts = [...dalsProducts, ...riceProducts]

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter(p => p.category === category)
}
