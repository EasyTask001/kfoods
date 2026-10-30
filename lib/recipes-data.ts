export interface Recipe {
  id: string
  title: string
  category: 'dal' | 'rice'
  description: string
  prepTime: string
  cookTime: string
  servings: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  image: string
  ingredients: string[]
  instructions: string[]
  tips?: string[]
  mainProduct: string // Product ID this recipe features
}

export const recipes: Recipe[] = [
  // Dal Recipes
  {
    id: 'creamy-moong-dal-soup',
    title: 'Creamy Moong Dal Soup',
    category: 'dal',
    description: 'A comforting, protein-rich soup with golden moong dal, vegetables, and warming spices.',
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    servings: '4-6',
    difficulty: 'Easy',
    image: '/recipe-moong-soup.webp',
    mainProduct: 'moong-dal',
    ingredients: [
      '1 cup Moong Dal, rinsed',
      '4 cups vegetable broth',
      '1 onion, diced',
      '2 cloves garlic, minced',
      '1 carrot, diced',
      '1 celery stalk, diced',
      '1 tsp cumin seeds',
      '1 tsp turmeric',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh cilantro for garnish',
      'Lemon wedges for serving'
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add cumin seeds and let them sizzle for 30 seconds.',
      'Add diced onion and cook until softened, about 5 minutes. Add garlic and cook for 1 minute.',
      'Stir in turmeric, carrot, and celery. Cook for 2-3 minutes.',
      'Add rinsed moong dal and vegetable broth. Bring to a boil.',
      'Reduce heat to low, cover, and simmer for 20 minutes until dal is tender.',
      'Use an immersion blender to partially blend the soup for a creamy texture, or leave it chunky.',
      'Season with salt and pepper. Serve hot, garnished with cilantro and lemon wedges.'
    ],
    tips: [
      'For extra creaminess, add a splash of coconut milk',
      'This soup thickens as it sits; add more broth when reheating',
      'Great for meal prep and freezes well'
    ]
  },
  {
    id: 'red-lentil-curry',
    title: 'Quick Red Lentil Curry',
    category: 'dal',
    description: 'A vibrant, flavorful curry made with red masoor dal, tomatoes, and aromatic spices.',
    prepTime: '10 minutes',
    cookTime: '20 minutes',
    servings: '4',
    difficulty: 'Easy',
    image: '/recipe-red-lentil-curry.webp',
    mainProduct: 'masoor-dal',
    ingredients: [
      '1 cup Masoor Dal (red lentils), rinsed',
      '2½ cups water',
      '1 can (14 oz) diced tomatoes',
      '1 onion, finely chopped',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '1 tbsp curry powder',
      '1 tsp cumin',
      '½ tsp paprika',
      '1 can (14 oz) coconut milk',
      '2 tbsp vegetable oil',
      'Salt to taste',
      'Fresh spinach (optional)',
      'Cooked rice for serving'
    ],
    instructions: [
      'Heat oil in a large skillet over medium heat. Sauté onion until golden, about 5 minutes.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Stir in curry powder, cumin, and paprika. Toast spices for 30 seconds.',
      'Add rinsed lentils, diced tomatoes, and water. Bring to a boil.',
      'Reduce heat and simmer for 15-18 minutes until lentils are tender and breaking down.',
      'Stir in coconut milk and fresh spinach (if using). Cook for 2 more minutes.',
      'Season with salt. Serve over rice or with naan bread.'
    ],
    tips: [
      'Red lentils cook very quickly—no soaking needed',
      'Add more water if curry becomes too thick',
      'Customize spice level with cayenne pepper'
    ]
  },
  {
    id: 'chana-dal-salad',
    title: 'Mediterranean Chana Dal Salad',
    category: 'dal',
    description: 'A fresh, protein-packed salad with chana dal, vegetables, and lemon herb dressing.',
    prepTime: '15 minutes',
    cookTime: '35 minutes',
    servings: '6',
    difficulty: 'Easy',
    image: '/recipe-chana-salad.webp',
    mainProduct: 'chana-dal',
    ingredients: [
      '1 cup Chana Dal, soaked 30 minutes',
      '3 cups water',
      '1 cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1 bell pepper, diced',
      '½ red onion, finely chopped',
      '¼ cup fresh parsley, chopped',
      '¼ cup fresh mint, chopped',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 tsp cumin',
      'Salt and pepper to taste',
      'Feta cheese (optional)'
    ],
    instructions: [
      'Drain soaked chana dal and add to a pot with 3 cups of water. Bring to a boil.',
      'Reduce heat and simmer for 30-35 minutes until dal is tender but still holds its shape.',
      'Drain and let cool to room temperature.',
      'In a large bowl, combine cooled dal, cucumber, tomatoes, bell pepper, red onion, parsley, and mint.',
      'In a small bowl, whisk together olive oil, lemon juice, cumin, salt, and pepper.',
      'Pour dressing over salad and toss well to combine.',
      'Refrigerate for at least 30 minutes. Top with feta cheese before serving if desired.'
    ],
    tips: [
      'This salad tastes even better the next day',
      'Great for meal prep and picnics',
      'Add grilled chicken or tofu for extra protein'
    ]
  },

  // Rice Recipes
  {
    id: 'perfect-fluffy-basmati',
    title: 'Perfect Fluffy Basmati Rice',
    category: 'rice',
    description: 'Master the art of cooking perfectly fluffy, aromatic basmati rice every time.',
    prepTime: '5 minutes',
    cookTime: '20 minutes',
    servings: '4',
    difficulty: 'Easy',
    image: '/recipe-perfect-rice.webp',
    mainProduct: 'white-basmati',
    ingredients: [
      '1½ cups White Basmati Rice',
      '2¼ cups water',
      '1 tsp salt',
      '1 tbsp butter or oil (optional)',
      '2-3 cardamom pods (optional)',
      '1 bay leaf (optional)'
    ],
    instructions: [
      'Rinse rice in cold water 3-4 times until water runs clear. This removes excess starch.',
      'In a medium pot, combine rinsed rice, water, and salt. Add butter and whole spices if using.',
      'Bring to a boil over high heat, uncovered.',
      'Once boiling, reduce heat to lowest setting, cover with a tight-fitting lid.',
      'Cook for 15 minutes without lifting the lid.',
      'Turn off heat and let rice rest, covered, for 5 minutes.',
      'Fluff with a fork, remove whole spices, and serve.'
    ],
    tips: [
      'The key is not lifting the lid during cooking',
      'Use a 1:1.5 rice-to-water ratio for basmati',
      'Resting time allows grains to firm up perfectly'
    ]
  },
  {
    id: 'vegetable-fried-rice',
    title: 'Golden Sella Fried Rice',
    category: 'rice',
    description: 'Restaurant-style fried rice using golden sella basmati for perfect texture.',
    prepTime: '15 minutes',
    cookTime: '15 minutes',
    servings: '4',
    difficulty: 'Medium',
    image: '/recipe-fried-rice.webp',
    mainProduct: 'sella-basmati',
    ingredients: [
      '3 cups cooked Golden Sella Basmati (cold, day-old is best)',
      '2 cups mixed vegetables (carrots, peas, corn, bell peppers)',
      '2 eggs, beaten',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '3 green onions, sliced',
      '3 tbsp soy sauce',
      '1 tbsp sesame oil',
      '2 tbsp vegetable oil',
      '½ tsp white pepper',
      'Salt to taste'
    ],
    instructions: [
      'Heat 1 tbsp oil in a large wok or skillet over high heat. Scramble eggs, then remove and set aside.',
      'Add remaining oil to wok. Stir-fry garlic and ginger for 30 seconds.',
      'Add mixed vegetables and stir-fry for 3-4 minutes until tender-crisp.',
      'Add cold rice, breaking up any clumps. Stir-fry for 3-4 minutes.',
      'Add soy sauce, sesame oil, and white pepper. Toss well to combine.',
      'Return scrambled eggs to the wok, add green onions, and toss for 1 minute.',
      'Taste and adjust seasoning. Serve immediately.'
    ],
    tips: [
      'Day-old refrigerated rice works best for fried rice',
      'Keep heat high for that signature wok flavor',
      'Golden Sella stays firm and separate—perfect for this dish'
    ]
  },
  {
    id: 'coconut-rice-pudding',
    title: 'Creamy Coconut Rice Pudding',
    category: 'rice',
    description: 'A luxurious dessert made with fragrant basmati rice, coconut milk, and warm spices.',
    prepTime: '10 minutes',
    cookTime: '40 minutes',
    servings: '6',
    difficulty: 'Easy',
    image: '/recipe-rice-pudding.webp',
    mainProduct: 'white-basmati',
    ingredients: [
      '½ cup White Basmati Rice, rinsed',
      '2 cups whole milk',
      '1 can (14 oz) coconut milk',
      '½ cup sugar',
      '1 tsp vanilla extract',
      '½ tsp cardamom powder',
      '¼ tsp salt',
      'Pinch of saffron (optional)',
      'Chopped pistachios and coconut flakes for topping'
    ],
    instructions: [
      'In a heavy-bottomed pot, combine rice, whole milk, and coconut milk.',
      'Bring to a gentle boil over medium heat, stirring occasionally.',
      'Reduce heat to low and simmer for 30-35 minutes, stirring frequently to prevent sticking.',
      'Rice should be very soft and mixture should thicken. Add sugar, vanilla, cardamom, and salt.',
      'Cook for 5 more minutes, stirring constantly.',
      'Remove from heat. Pudding will thicken more as it cools.',
      'Serve warm or chilled, topped with pistachios and coconut flakes.'
    ],
    tips: [
      'Stir frequently to prevent rice from sticking to bottom',
      'Adjust sugar to your preferred sweetness level',
      'Delicious served warm in winter or chilled in summer'
    ]
  }
]

export function getRecipesByCategory(category: 'dal' | 'rice'): Recipe[] {
  return recipes.filter(r => r.category === category)
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id)
}
