/**
 * BUBBLE & BREW – Central Content & Business Configuration
 * =========================================================
 * Single source of truth for the entire website.
 * Contains:
 *  - Business & contact information
 *  - Brand identity & core messaging
 *  - Currency & standardized pricing rules (INR / ₹)
 *  - Complete product catalog (All 6 collections & 22 standardized recipes)
 *  - Categories & collection definitions
 *  - Drink sizes & volume specifications
 *  - Ingredients, milk choices, toppings & sweetness levels
 *  - Loyalty program tiers
 *  - Shared labels, navigation links & CTAs
 *  - Reusable helper functions (formatPrice, getProduct, calculatePrice)
 */

(function () {
  'use strict';

  const BB_SITE_DATA = {

    /* ═══════════════════════════════════════════════════════════════════════
       1. BUSINESS INFORMATION & CONTACT DETAILS
       ═══════════════════════════════════════════════════════════════════════ */
    business: {
      name: 'BUBBLE & BREW',
      legalName: 'Bubble & Brew Artisanal Tea Co.',
      tagline: 'Artisanal Tea Room',
      brandMessage: 'A Little Happiness in Every Sip.',
      subMessage: 'Your favourite flavours, your little moments of joy.',
      description: 'Bubble Tea & Boba Shop',
      foundedYear: 2018,

      // Centralized address
      address: {
        street: '42 Boba Lane, Chai District',
        area: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India',
        fullLine: '42 Boba Lane, Chai District, Connaught Place, New Delhi 110001, India',
        shortLine: '42 Boba Lane, Chai District, New Delhi',
        mapsUrl: 'https://maps.google.com/?q=42+Boba+Lane+Connaught+Place+New+Delhi'
      },

      // Phone
      phone: {
        display: '+91 98765 43210',
        tel: 'tel:+919876543210',
        hours: 'Available Mon–Sun: 10:00 AM – 10:00 PM'
      },

      // Email
      email: {
        display: 'hello@bubbleandbrew.com',
        mailto: 'mailto:hello@bubbleandbrew.com',
        desc: 'We reply within 24 hours — no bots, just our friendly boba crew.'
      },

      // Operating Timings
      timings: {
        summary: 'Mon – Sun: 10:00 AM – 10:00 PM',
        schedule: [
          { day: 'Monday',    open: '10:00 AM', close: '10:00 PM' },
          { day: 'Tuesday',   open: '10:00 AM', close: '10:00 PM' },
          { day: 'Wednesday', open: '10:00 AM', close: '10:00 PM' },
          { day: 'Thursday',  open: '10:00 AM', close: '10:00 PM' },
          { day: 'Friday',    open: '10:00 AM', close: '10:00 PM' },
          { day: 'Saturday',  open: '10:00 AM', close: '10:00 PM' },
          { day: 'Sunday',    open: '10:00 AM', close: '10:00 PM' }
        ]
      },

      // Social Links
      socials: {
        instagram: { label: 'Instagram', url: 'https://instagram.com' },
        facebook:  { label: 'Facebook',  url: 'https://facebook.com'  },
        pinterest: { label: 'Pinterest', url: 'https://pinterest.com' },
        youtube:   { label: 'YouTube',   url: 'https://youtube.com'   },
        x:         { label: 'X / Twitter', url: 'https://x.com'       }
      }
    },

    /* ═══════════════════════════════════════════════════════════════════════
       2. CURRENCY & PRICING STANDARDS
       ═══════════════════════════════════════════════════════════════════════ */
    currency: {
      code: 'INR',
      symbol: '₹',
      symbolHtml: '&#8377;',
      name: 'Indian Rupee'
    },

    /* ═══════════════════════════════════════════════════════════════════════
       3. PRODUCT CATEGORIES
       ═══════════════════════════════════════════════════════════════════════ */
    categories: {
      'classic': {
        id: 'classic',
        name: 'Classic Milk Tea',
        badge: 'Timeless Classic',
        desc: 'Traditional Sun Moon Lake black tea steeped to perfection, paired with velvety whole milk and honeyed chewy tapioca pearls.'
      },
      'brown-sugar': {
        id: 'brown-sugar',
        name: 'Brown Sugar Specials',
        badge: '#1 Bestseller',
        desc: 'Tiger-striped perfection with slow-caramelized Muscovado syrup, warm boba, and chilled fresh milk.'
      },
      'fruit': {
        id: 'fruit',
        name: 'Fruity Refreshers',
        badge: 'Fresh & Light',
        desc: 'Real brewed jasmine green tea infused with vibrant seasonal fruit purees, fresh fruit slices, and popping boba.'
      },
      'matcha': {
        id: 'matcha',
        name: 'Matcha Collection',
        badge: 'Ceremonial Grade',
        desc: 'First-harvest Japanese stone-ground Uji matcha, hand-whisked and layered over sweet velvety milk.'
      },
      'taro': {
        id: 'taro',
        name: 'Taro & Creamy Blends',
        badge: 'Silky Comfort',
        desc: 'Nutty, comforting steamed taro root puree whipped with whole milk and finished with purple sweet potato notes.'
      },
      'signature': {
        id: 'signature',
        name: 'Signature Creations',
        badge: 'Chef Signature',
        desc: 'Our barista team’s proudest original creations — layered textures, cheese cream caps, and artisanal syrups.'
      }
    },

    /* ═══════════════════════════════════════════════════════════════════════
       4. STANDARDIZED PRODUCT CATALOG (22 Central Drinks)
       ═══════════════════════════════════════════════════════════════════════ */
    products: {
      // ── A. Classic Milk Tea ──────────────────────────────────────────────
      'classic-milk-tea': {
        id: 'classic-milk-tea',
        name: 'Classic Milk Tea',
        category: 'classic',
        categoryName: 'Classic Milk Tea',
        basePrice: 99,
        largePrice: 129,
        image: 'https://images.pexels.com/photos/9271564/pexels-photo-9271564.jpeg?cs=srgb&dl=pexels-amar-9271564.jpg&fm=jpg',
        badge: 'Classic',
        calories: '280 kcal',
        desc: 'Traditional high-mountain black tea steeped to a bold coppery amber, blended with silky fresh milk and pure cane sugar.'
      },
      'classic-pearl-milk-tea': {
        id: 'classic-pearl-milk-tea',
        name: 'Classic Pearl Milk Tea',
        category: 'classic',
        categoryName: 'Classic Milk Tea',
        basePrice: 119,
        largePrice: 149,
        image: 'https://images.pexels.com/photos/12666754/pexels-photo-12666754.jpeg?cs=srgb&dl=pexels-telly-mina-262052395-12666754.jpg&fm=jpg',
        badge: 'Fan Favourite',
        calories: '320 kcal',
        desc: 'Our original heritage recipe — bold black milk tea poured over a generous serving of slow-simmered, springy tapioca pearls.'
      },
      'honey-milk-tea': {
        id: 'honey-milk-tea',
        name: 'Honey Milk Tea',
        category: 'classic',
        categoryName: 'Classic Milk Tea',
        basePrice: 129,
        largePrice: 159,
        image: 'https://images.pexels.com/photos/6412828/pexels-photo-6412828.jpeg?cs=srgb&dl=pexels-rdne-6412828.jpg&fm=jpg',
        badge: 'Sweet Nectar',
        calories: '310 kcal',
        desc: 'Slow-steeped Assam black tea sweetened exclusively with 100% pure wild clover honey and softened with creamy whole milk.'
      },
      'vanilla-milk-tea': {
        id: 'vanilla-milk-tea',
        name: 'Vanilla Milk Tea',
        category: 'classic',
        categoryName: 'Classic Milk Tea',
        basePrice: 119,
        largePrice: 149,
        image: 'https://images.pexels.com/photos/6412836/pexels-photo-6412836.jpeg?cs=srgb&dl=pexels-rdne-6412836.jpg&fm=jpg',
        badge: 'Aromatic',
        calories: '300 kcal',
        desc: 'Ceylon black tea infused with natural Madagascar bourbon vanilla pods, yielding a fragrant, gently floral sweet finish.'
      },

      // ── B. Brown Sugar Specials ──────────────────────────────────────────
      'brown-sugar-boba-milk': {
        id: 'brown-sugar-boba-milk',
        name: 'Brown Sugar Boba Milk',
        category: 'brown-sugar',
        categoryName: 'Brown Sugar Specials',
        basePrice: 149,
        largePrice: 179,
        image: 'https://images.pexels.com/photos/6412828/pexels-photo-6412828.jpeg?cs=srgb&dl=pexels-rdne-6412828.jpg&fm=jpg',
        badge: 'Bestseller',
        calories: '360 kcal',
        desc: 'Our iconic tiger-striped masterpiece. Warm tapioca pearls simmered in slow-caramelized Taiwanese brown sugar, topped with chilled organic milk.'
      },
      'brown-sugar-cream-milk': {
        id: 'brown-sugar-cream-milk',
        name: 'Brown Sugar Cream Milk',
        category: 'brown-sugar',
        categoryName: 'Brown Sugar Specials',
        basePrice: 159,
        largePrice: 189,
        image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
        badge: 'Rich Layer',
        calories: '390 kcal',
        desc: 'Decadent brown sugar boba milk crowned with a velvety layer of torched salted-caramel cheese cream foam.'
      },
      'caramel-pearl-milk-tea': {
        id: 'caramel-pearl-milk-tea',
        name: 'Caramel Pearl Milk Tea',
        category: 'brown-sugar',
        categoryName: 'Brown Sugar Specials',
        basePrice: 139,
        largePrice: 169,
        image: 'https://images.pexels.com/photos/11160112/pexels-photo-11160112.jpeg?cs=srgb&dl=pexels-shameel-mukkath-3421394-11160112.jpg&fm=jpg',
        badge: 'Signature',
        calories: '340 kcal',
        desc: 'Dark roasted caramel sauce swirled into Ceylon milk tea with a double portion of warm, buttery tapioca boba.'
      },
      'brown-sugar-latte': {
        id: 'brown-sugar-latte',
        name: 'Brown Sugar Latte',
        category: 'brown-sugar',
        categoryName: 'Brown Sugar Specials',
        basePrice: 149,
        largePrice: 179,
        image: 'https://images.pexels.com/photos/35229818/pexels-photo-35229818.jpeg?cs=srgb&dl=pexels-35229818.jpg&fm=jpg',
        badge: 'Artisan',
        calories: '350 kcal',
        desc: 'A tea-forward latte featuring intense slow-brewed black tea, whole steamed milk, and rich Muscovado syrup.'
      },

      // ── C. Fruity Refreshers ─────────────────────────────────────────────
      'strawberry-fruit-tea': {
        id: 'strawberry-fruit-tea',
        name: 'Strawberry Fruit Tea',
        category: 'fruit',
        categoryName: 'Fruity Refreshers',
        basePrice: 129,
        largePrice: 159,
        image: 'https://images.pexels.com/photos/29653637/pexels-photo-29653637.jpeg?cs=srgb&dl=pexels-eden-fc-620771246-29653637.jpg&fm=jpg',
        badge: 'Berry Fresh',
        calories: '210 kcal',
        desc: 'Crisp jasmine green tea shaken with real crushed strawberries, lime slices, and popping strawberry boba pearls.'
      },
      'mango-fruit-tea': {
        id: 'mango-fruit-tea',
        name: 'Mango Fruit Tea',
        category: 'fruit',
        categoryName: 'Fruity Refreshers',
        basePrice: 129,
        largePrice: 159,
        image: 'https://images.pexels.com/photos/33212344/pexels-photo-33212344.jpeg?cs=srgb&dl=pexels-lol-bubble-tea-2154418419-33212344.jpg&fm=jpg',
        badge: 'Tropical',
        calories: '220 kcal',
        desc: 'Sweet Alphonso mango nectar blended over iced four-season oolong tea with refreshing coconut jelly cubes.'
      },
      'passion-fruit-tea': {
        id: 'passion-fruit-tea',
        name: 'Passion Fruit Tea',
        category: 'fruit',
        categoryName: 'Fruity Refreshers',
        basePrice: 139,
        largePrice: 169,
        image: 'https://images.pexels.com/photos/19996404/pexels-photo-19996404.jpeg?cs=srgb&dl=pexels-berlinerlights-19996404.jpg&fm=jpg',
        badge: 'Tangy Spark',
        calories: '200 kcal',
        desc: 'Tart tropical passion fruit pulp shaken with chilled jasmine green tea, lime wheels, and chewy fruit jelly.'
      },
      'peach-fruit-tea': {
        id: 'peach-fruit-tea',
        name: 'Peach Fruit Tea',
        category: 'fruit',
        categoryName: 'Fruity Refreshers',
        basePrice: 129,
        largePrice: 159,
        image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
        badge: 'Delicate',
        calories: '190 kcal',
        desc: 'Fragrant white peach essence layered with light green tea, juicy peach bites, and mango popping boba.'
      },

      // ── D. Matcha Collection ─────────────────────────────────────────────
      'classic-matcha-milk-tea': {
        id: 'classic-matcha-milk-tea',
        name: 'Classic Matcha Milk Tea',
        category: 'matcha',
        categoryName: 'Matcha Collection',
        basePrice: 149,
        largePrice: 179,
        image: 'https://images.pexels.com/photos/31599066/pexels-photo-31599066.jpeg?cs=srgb&dl=pexels-31599066.jpg&fm=jpg',
        badge: 'Ceremonial',
        calories: '290 kcal',
        desc: 'Authentic stone-ground Japanese Uji matcha whisked to order with warm water and poured over chilled sweetened whole milk.'
      },
      'strawberry-matcha': {
        id: 'strawberry-matcha',
        name: 'Strawberry Matcha',
        category: 'matcha',
        categoryName: 'Matcha Collection',
        basePrice: 169,
        largePrice: 199,
        image: 'https://images.pexels.com/photos/33212344/pexels-photo-33212344.jpeg?cs=srgb&dl=pexels-lol-bubble-tea-2154418419-33212344.jpg&fm=jpg',
        badge: 'Stunning Layers',
        calories: '310 kcal',
        desc: 'A gorgeous tri-colour drink: housemade strawberry fruit compote at the base, silky milk in the middle, and vivid green matcha on top.'
      },
      'matcha-pearl-latte': {
        id: 'matcha-pearl-latte',
        name: 'Matcha Pearl Latte',
        category: 'matcha',
        categoryName: 'Matcha Collection',
        basePrice: 159,
        largePrice: 189,
        image: 'https://images.pexels.com/photos/31599066/pexels-photo-31599066.jpeg?cs=srgb&dl=pexels-31599066.jpg&fm=jpg',
        badge: 'Velvety',
        calories: '330 kcal',
        desc: 'Ceremonial stone-ground matcha layered over velvety whole milk and springy honey tapioca pearls.'
      },
      'matcha-velvet': {
        id: 'matcha-velvet',
        name: 'Matcha Velvet',
        category: 'matcha',
        categoryName: 'Matcha Collection',
        isSignature: true,
        basePrice: 169,
        largePrice: 199,
        image: 'https://images.pexels.com/photos/31599066/pexels-photo-31599066.jpeg?cs=srgb&dl=pexels-31599066.jpg&fm=jpg',
        badge: 'Signature',
        calories: '340 kcal',
        desc: 'First-harvest Uji matcha layered with Madagascar vanilla bean milk, chewy pearls, and finished with a fluffy cream foam cap.'
      },

      // ── E. Taro & Creamy Blends ──────────────────────────────────────────
      'taro-milk-tea': {
        id: 'taro-milk-tea',
        name: 'Taro Milk Tea',
        category: 'taro',
        categoryName: 'Taro & Creamy Blends',
        basePrice: 139,
        largePrice: 169,
        image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
        badge: 'Nutty & Rich',
        calories: '320 kcal',
        desc: 'Real purple taro root steamed and whipped with sweet condensed milk and light black tea for a velvety, pastel-purple comfort drink.'
      },
      'taro-pearl-milk': {
        id: 'taro-pearl-milk',
        name: 'Taro Pearl Milk',
        category: 'taro',
        categoryName: 'Taro & Creamy Blends',
        basePrice: 149,
        largePrice: 179,
        image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
        badge: 'Comfort Classic',
        calories: '360 kcal',
        desc: 'Thick house-mashed sweet taro paste swirled along the cup, filled with fresh milk and warm chewy tapioca pearls.'
      },
      'vanilla-cream-tea': {
        id: 'vanilla-cream-tea',
        name: 'Vanilla Cream Tea',
        category: 'taro',
        categoryName: 'Taro & Creamy Blends',
        basePrice: 139,
        largePrice: 169,
        image: 'https://images.pexels.com/photos/9271564/pexels-photo-9271564.jpeg?cs=srgb&dl=pexels-amar-9271564.jpg&fm=jpg',
        badge: 'Silky Velvet',
        calories: '310 kcal',
        desc: 'Delicate cream infused with whole vanilla beans, shaken over fragrant Taiwan oolong tea and finished with smooth pudding.'
      },
      'taro-dream': {
        id: 'taro-dream',
        name: 'Taro Dream',
        category: 'taro',
        categoryName: 'Taro & Creamy Blends',
        isSignature: true,
        basePrice: 159,
        largePrice: 189,
        image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
        badge: 'Chef Signature',
        calories: '350 kcal',
        desc: 'A dreamlike swirl of steamed purple taro, coconut cream, velvety black tea, and slow-cooked caramelized brown sugar boba.'
      },

      // ── F. Signature Creations ───────────────────────────────────────────
      'strawberry-cloud': {
        id: 'strawberry-cloud',
        name: 'Strawberry Cloud',
        category: 'signature',
        categoryName: 'Signature Creations',
        isSignature: true,
        basePrice: 159,
        largePrice: 189,
        image: 'https://images.pexels.com/photos/29653637/pexels-photo-29653637.jpeg?cs=srgb&dl=pexels-eden-fc-620771246-29653637.jpg&fm=jpg',
        badge: 'Chef Special',
        calories: '330 kcal',
        desc: 'Handcrafted wild strawberry puree shaken with organic milk and topped with an airy cloud of salted-sweet cream cheese foam.'
      },
      'brown-sugar-bliss': {
        id: 'brown-sugar-bliss',
        name: 'Brown Sugar Bliss',
        category: 'signature',
        categoryName: 'Signature Creations',
        isSignature: true,
        basePrice: 169,
        largePrice: 199,
        image: 'https://images.pexels.com/photos/6412828/pexels-photo-6412828.jpeg?cs=srgb&dl=pexels-rdne-6412828.jpg&fm=jpg',
        badge: 'Award Winner',
        calories: '380 kcal',
        desc: 'The ultimate boba indulgence: slow-simmered brown sugar boba, caramelized syrup drips, organic Hokkaido milk, and torch-brûléed cream cap.'
      }
    },

    /* ═══════════════════════════════════════════════════════════════════════
       5. DRINK SIZES (Small, Medium, Large)
       ═══════════════════════════════════════════════════════════════════════ */
    sizes: {
      'small': {
        id: 'small',
        name: 'Small',
        volume: '350 ml',
        priceDelta: -20,
        isDefault: false,
        desc: 'A quick, refreshing cup for a light afternoon pick-me-up.'
      },
      'medium': {
        id: 'medium',
        name: 'Medium',
        volume: '500 ml',
        priceDelta: 0,
        isDefault: true,
        desc: 'Our standard regular cup — perfectly proportioned for balance.'
      },
      'large': {
        id: 'large',
        name: 'Large',
        volume: '700 ml',
        priceDelta: 30,
        isDefault: false,
        desc: 'Generous indulgence for serious boba cravings.'
      }
    },

    /* ═══════════════════════════════════════════════════════════════════════
       6. CUSTOMIZATION OPTIONS (Toppings, Milk, Additions, Sweetness, Ice)
       ═══════════════════════════════════════════════════════════════════════ */
    customization: {
      // Toppings
      toppings: [
        {
          id: 'classic-pearls',
          name: 'Classic Tapioca Pearls',
          price: 25,
          image: 'images/topping_pearls.jpg',
          desc: 'Chewy brown-glazed grade-A cassava pearls simmered in honey.'
        },
        {
          id: 'brown-sugar-pearls',
          name: 'Brown Sugar Pearls',
          price: 30,
          image: 'images/menu_addon_bs_pearls.jpg',
          desc: 'Warm pearls simmered in slow-cooked Taiwanese Muscovado syrup.'
        },
        {
          id: 'mango-popping',
          name: 'Mango Popping Boba',
          price: 30,
          image: 'images/menu_addon_mango_popping.jpg',
          desc: 'Juicy popping pearls that burst with tropical mango nectar.'
        },
        {
          id: 'strawberry-popping',
          name: 'Strawberry Popping Boba',
          price: 30,
          image: 'images/menu_addon_strawberry_popping.jpg',
          desc: 'Tart berry burst in every single bite.'
        },
        {
          id: 'fruit-jelly',
          name: 'Fruit Jelly',
          price: 25,
          image: 'images/menu_addon_fruit_jelly.jpg',
          desc: 'Firm, bouncy mixed fruit jelly ribbons.'
        },
        {
          id: 'coconut-jelly',
          name: 'Coconut Jelly',
          price: 25,
          image: 'images/menu_addon_coconut_jelly.jpg',
          desc: 'Refreshing nata de coco cubes with subtle sweetness.'
        }
      ],

      // Milk Options
      milk: [
        {
          id: 'regular-milk',
          name: 'Regular Milk',
          price: 0,
          isDefault: true,
          desc: 'Farm-fresh creamy whole dairy milk, silky and balanced.'
        },
        {
          id: 'oat-milk',
          name: 'Oat Milk',
          price: 30,
          isDefault: false,
          desc: 'Barista-grade oat milk with a subtle toasted cereal sweetness.'
        },
        {
          id: 'almond-milk',
          name: 'Almond Milk',
          price: 30,
          isDefault: false,
          desc: 'Nutty, light and naturally low-calorie dairy alternative.'
        },
        {
          id: 'soy-milk',
          name: 'Soy Milk',
          price: 25,
          isDefault: false,
          desc: 'Smooth organic non-GMO soy milk infusion.'
        }
      ],

      // Additional Options
      additions: [
        {
          id: 'cream-foam',
          name: 'Cream Foam',
          price: 25,
          image: 'images/menu_addon_cream_foam.jpg',
          desc: 'Velvety sea-salt cream cap floated gently on top.'
        },
        {
          id: 'whipped-cream',
          name: 'Whipped Cream',
          price: 25,
          image: 'images/menu_addon_whipped_cream.jpg',
          desc: 'Fluffy cloud of light vanilla whipped cream.'
        },
        {
          id: 'extra-milk',
          name: 'Extra Milk',
          price: 20,
          image: 'images/menu_addon_extra_milk.jpg',
          desc: 'An extra splash of rich creamy goodness.'
        }
      ],

      // Sweetness Levels
      sweetness: [
        { id: 'sweet-0',   level: '0%',   label: '0% – No Added Sweetness', shortLabel: '0% Unsweetened',  desc: 'Unsweetened, highlighting pure tea notes.' },
        { id: 'sweet-25',  level: '25%',  label: '25% – Light Sweetness',    shortLabel: '25% Light',        desc: 'Subtle touch of sugar cane sweetness.' },
        { id: 'sweet-50',  level: '50%',  label: '50% – Balanced Sweetness', shortLabel: '50% Balanced',     desc: 'The golden ratio of flavour and sweet.' },
        { id: 'sweet-75',  level: '75%',  label: '75% – Sweet',              shortLabel: '75% Sweet',        desc: 'A rich treat for sweet-tooth lovers.' },
        { id: 'sweet-100', level: '100%', label: '100% – Extra Sweet',       shortLabel: '100% Extra Sweet', desc: 'Full traditional Taiwanese bubble tea sweetness.' }
      ],

      // Ice Levels
      ice: [
        { id: 'ice-none',    level: 'No Ice',     label: 'No Ice',     desc: 'Full drink volume, room temperature.' },
        { id: 'ice-less',    level: 'Less Ice',   label: 'Less Ice',   desc: 'Just a touch of cooling chill.' },
        { id: 'ice-regular', level: 'Regular Ice', label: 'Regular Ice', isDefault: true, desc: 'Optimal crisp refreshing temperature.' },
        { id: 'ice-extra',   level: 'Extra Cold', label: 'Extra Cold', desc: 'Maximum ice chill for hot days.' }
      ]
    },

    /* ═══════════════════════════════════════════════════════════════════════
       7. LOYALTY PROGRAM DEFINITION
       ═══════════════════════════════════════════════════════════════════════ */
    loyalty: {
      name: 'Boba Club Rewards',
      pointsRule: 'Earn 10 Boba Points for every ₹100 spent',
      tiers: [
        {
          name: 'Pearl Member',
          minSpend: 0,
          perks: 'Earn 10 pts per ₹100 • Birthday double points'
        },
        {
          name: 'Golden Brew',
          minSpend: 2500,
          perks: 'Free size upgrade once a month • 1.25x points'
        },
        {
          name: 'Boba Master',
          minSpend: 7500,
          perks: 'Free drink voucher every 500 points • 1.5x points • VIP tasting invites'
        }
      ]
    },

    /* ═══════════════════════════════════════════════════════════════════════
       8. SHARED LABELS, NAVIGATION & CTA TEXTS
       ═══════════════════════════════════════════════════════════════════════ */
    cta: {
      exploreMenu: 'Explore Our Menu',
      createDrink: 'Create Your Drink',
      customizeCup: 'Customize Your Cup',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      backToHome: 'Back to Home',
      login: 'Login',
      signUp: 'Sign Up',
      orderNow: 'Order Now',
      addToBag: 'Add to Bag',
      checkout: 'Proceed to Checkout'
    },

    /* ═══════════════════════════════════════════════════════════════════════
       9. HELPER FUNCTIONS
       ═══════════════════════════════════════════════════════════════════════ */
    /**
     * Formats a numeric amount with the ₹ symbol.
     * e.g. formatPrice(149) -> "₹149"
     */
    formatPrice: function (amount) {
      const num = Math.round(Number(amount) || 0);
      return `₹${num}`;
    },

    /**
     * Look up a product by its ID in the catalog.
     */
    getProduct: function (productId) {
      return this.products[productId] || null;
    },

    /**
     * Returns all products belonging to a category.
     */
    getProductsByCategory: function (categoryKey) {
      if (!categoryKey || categoryKey === 'all') {
        return Object.values(this.products);
      }
      return Object.values(this.products).filter(p => p.category === categoryKey);
    },

    /**
     * Calculates the price for a customized drink.
     * @param {number} basePrice
     * @param {string} sizeId ('small', 'medium', 'large')
     * @param {string} milkId ('regular-milk', 'oat-milk', etc.)
     * @param {Array<string>} toppingIds
     * @returns {number}
     */
    calculateDrinkPrice: function (basePrice, sizeId, milkId, toppingIds = []) {
      let total = Number(basePrice) || 0;

      // Size adjustment
      const sizeObj = this.sizes[sizeId];
      if (sizeObj) {
        total += sizeObj.priceDelta;
      }

      // Milk adjustment
      const milkObj = this.customization.milk.find(m => m.id === milkId);
      if (milkObj) {
        total += milkObj.price;
      }

      // Toppings adjustment
      if (Array.isArray(toppingIds)) {
        toppingIds.forEach(tId => {
          const tObj = this.customization.toppings.find(t => t.id === tId) ||
                       this.customization.additions.find(a => a.id === tId);
          if (tObj) {
            total += tObj.price;
          }
        });
      }

      return Math.max(0, total);
    }
  };

  // Expose globally to window
  if (typeof window !== 'undefined') {
    window.BB_SITE_DATA = BB_SITE_DATA;
    // Shortcut alias for convenience
    window.BB_DATA = BB_SITE_DATA;
  }

  // Export for Node environments / testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = BB_SITE_DATA;
  }
})();
