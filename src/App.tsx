import React, { useState, useMemo } from 'react';
import {
  Flame,
  Clock,
  Phone,
  MapPin,
  Star,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Search,
  Sparkles,
  Check,
  Menu as MenuIcon,
  X,
  UtensilsCrossed,
  ShieldCheck,
  Wallet,
  Send,
  MessageCircle,
  Copy,
  Truck,
  PartyPopper,
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';

// Generated authentic food assets
import heroChaapImg from './assets/images/up14_hero_chaap_1791194226649.jpg';
import tandooriMomosImg from './assets/images/up14_tandoori_momos_1791194243957.jpg';
import malaiChaapImg from './assets/images/up14_malai_chaap_1791194259800.jpg';
import tawaChaapImg from './assets/images/up14_tawa_chaap_1791194273317.jpg';
import paneerButterMasalaImg from './assets/images/up14_paneer_butter_masala_1791194927604.jpg';
import dalMakhniImg from './assets/images/up14_dal_makhni_1791194945729.jpg';
import chilliPaneerImg from './assets/images/up14_chilli_paneer_1791194961683.jpg';
import friedRiceManchurianImg from './assets/images/up14_fried_rice_manchurian_1791194973883.jpg';
import tandooriNaanImg from './assets/images/up14_tandoori_naan_roti_1791194986765.jpg';

export interface MenuItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'main' | 'chaap_momos' | 'starters' | 'rice' | 'breads' | 'rolls';
  description: string;
  halfPrice?: number;
  fullPrice: number;
  hasPortions: boolean;
  image: string;
  tag?: string;
  isBestseller?: boolean;
  isSpecial?: boolean;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  portion: 'Half' | 'Full' | 'Standard';
  price: number;
  quantity: number;
}

// Complete Official Menu from UP 14 Restaurant & Party Hall Menu Boards
const OFFICIAL_MENU_ITEMS: MenuItem[] = [
  // --- MAIN COURSE SPECIALTIES ---
  {
    id: 'up14-special-paneer',
    name: 'UP-14 Special Paneer',
    hindiName: 'UP-14 स्पेशल पनीर',
    category: 'main',
    description: 'Chef signature dish cooked with royal cottage cheese in a secret rich spiced gravy with cashews and creamy buttery finish.',
    halfPrice: 165,
    fullPrice: 230,
    hasPortions: true,
    image: paneerButterMasalaImg,
    tag: 'House Special',
    isBestseller: true,
    isSpecial: true
  },
  {
    id: 'korma-chaap',
    name: 'Korma Chaap',
    hindiName: 'कोरमा चाप',
    category: 'main',
    description: 'Slow-braised soya chaap simmered in a decadent aromatic Mughlai korma gravy with caramelized onions and yogurt.',
    halfPrice: 165,
    fullPrice: 260,
    hasPortions: true,
    image: malaiChaapImg,
    tag: 'Rich & Creamy'
  },
  {
    id: 'tawa-chaap-main',
    name: 'Tawa Chaap Gravy',
    hindiName: 'तवा चाप ग्रेवी',
    category: 'main',
    description: 'Famous Delhi NCR style iron-tawa roasted chaap smothered in a zesty, butter-loaded tomato and onion masala.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: tawaChaapImg,
    tag: 'All-Time Favorite',
    isBestseller: true
  },
  {
    id: 'lababdar-chaap',
    name: 'Lababdar Chaap',
    hindiName: 'लबाबदार चाप',
    category: 'main',
    description: 'Luscious chaap pieces in a mildly spiced, sweet-savory onion-tomato gravy finished with grated paneer and cream.',
    halfPrice: 140,
    fullPrice: 200,
    hasPortions: true,
    image: tawaChaapImg,
    tag: 'Mild & Rich'
  },
  {
    id: 'shahi-chaap',
    name: 'Shahi Chaap',
    hindiName: 'शाही चाप',
    category: 'main',
    description: 'Velvety royal white-and-gold cashew gravy with tender roasted chaap and fragrant cardamom aroma.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: malaiChaapImg,
    tag: 'Royal Feast'
  },
  {
    id: 'kadai-chaap',
    name: 'Kadai Chaap',
    hindiName: 'कड़ाही चाप',
    category: 'main',
    description: 'Cooked in a traditional iron kadai with crunchy bell peppers, whole coriander seeds, and crushed dried red chilies.',
    halfPrice: 160,
    fullPrice: 230,
    hasPortions: true,
    image: tawaChaapImg,
    tag: 'Spicy Kadai'
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    hindiName: 'पनीर बटर मसाला',
    category: 'main',
    description: 'Fresh malai paneer cubes simmered in our signature rich buttery tomato makhani sauce with sweet undertones.',
    halfPrice: 140,
    fullPrice: 220,
    hasPortions: true,
    image: paneerButterMasalaImg,
    tag: 'Bestseller Gravy',
    isBestseller: true
  },
  {
    id: 'shahi-paneer',
    name: 'Shahi Paneer',
    hindiName: 'शाही पनीर',
    category: 'main',
    description: 'Classic royal Mughlai preparation of cottage cheese in a silky cashew nut and fragrant cream gravy.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: paneerButterMasalaImg,
    tag: 'Classic'
  },
  {
    id: 'korma-paneer',
    name: 'Korma Paneer',
    hindiName: 'कोरमा पनीर',
    category: 'main',
    description: 'Golden paneer cubes tossed in rich and aromatic royal korma spiced gravy with saffron notes.',
    halfPrice: 170,
    fullPrice: 260,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    hindiName: 'कड़ाही पनीर',
    category: 'main',
    description: 'Cottage cheese and crisp bell peppers stir-fried in freshly ground kadai spice masala.',
    halfPrice: 140,
    fullPrice: 210,
    hasPortions: true,
    image: chilliPaneerImg,
    tag: 'Spicy'
  },
  {
    id: 'paneer-lababdar',
    name: 'Paneer Lababdar',
    hindiName: 'पनीर लबाबदार',
    category: 'main',
    description: 'Decadent gravy made with ripe tomatoes, dry fruits, and aromatic spices with juicy paneer slices.',
    halfPrice: 140,
    fullPrice: 220,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'paneer-do-pyaza',
    name: 'Paneer Do Pyaza',
    hindiName: 'पनीर दो प्याज़ा',
    category: 'main',
    description: 'Cooked with double onions—crunchy sautéed cubes and caramelized onion gravy with whole spices.',
    halfPrice: 140,
    fullPrice: 220,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'matar-paneer',
    name: 'Matar Paneer',
    hindiName: 'मटर पनीर',
    category: 'main',
    description: 'Homestyle comfort dish of tender green peas and soft paneer in an onion-tomato gravy.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'matar-mushroom',
    name: 'Matar Mushroom',
    hindiName: 'मटर मशरूम',
    category: 'main',
    description: 'Fresh sliced button mushrooms and tender sweet peas simmered in rich North Indian gravy.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: chilliPaneerImg
  },
  {
    id: 'dal-makhni',
    name: 'Dal Makhni',
    hindiName: 'दाल मखनी',
    category: 'main',
    description: 'Slow-cooked black lentils and kidney beans simmered overnight on low embers with fresh cream and butter.',
    halfPrice: 140,
    fullPrice: 210,
    hasPortions: true,
    image: dalMakhniImg,
    tag: 'Clay Slow Cooked',
    isBestseller: true
  },
  {
    id: 'dal-handi',
    name: 'Dal Handi',
    hindiName: 'दाल हांडी',
    category: 'main',
    description: 'Thick yellow lentils tempered in a traditional clay handi with garlic, desi ghee, and red chilies.',
    halfPrice: 155,
    fullPrice: 220,
    hasPortions: true,
    image: dalMakhniImg
  },
  {
    id: 'dal-tadka',
    name: 'Dal Tadka',
    hindiName: 'दाल तड़का',
    category: 'main',
    description: 'Yellow arhar dal tempered with cumin, golden garlic, onions, tomatoes, and sizzling ghee tadka.',
    halfPrice: 95,
    fullPrice: 165,
    hasPortions: true,
    image: dalMakhniImg
  },
  {
    id: 'malai-kofta',
    name: 'Malai Kofta',
    hindiName: 'मलाई कोफ्ता',
    category: 'main',
    description: 'Melt-in-mouth paneer and potato dumplings stuffed with nuts, served in a rich creamy cashew gravy.',
    halfPrice: 150,
    fullPrice: 210,
    hasPortions: true,
    image: paneerButterMasalaImg,
    tag: 'Rich Treat'
  },
  {
    id: 'kashmir-dum-aloo',
    name: 'Kashmir Dum Aloo',
    hindiName: 'कश्मीरी दम आलू',
    category: 'main',
    description: 'Baby potatoes fried and slowly braised in a yogurt, fennel, and Kashmiri dry ginger gravy.',
    halfPrice: 135,
    fullPrice: 200,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'dum-aloo',
    name: 'Dum Aloo',
    hindiName: 'दम आलू',
    category: 'main',
    description: 'Spiced baby potatoes cooked under steam in a rich North Indian tomato-onion gravy.',
    halfPrice: 95,
    fullPrice: 165,
    hasPortions: true,
    image: paneerButterMasalaImg
  },
  {
    id: 'jeera-aloo',
    name: 'Jeera Aloo',
    hindiName: 'जीरा आलू',
    category: 'main',
    description: 'Crispy boiled potatoes tossed with roasted cumin seeds, turmeric, green chilies, and fresh coriander.',
    halfPrice: 95,
    fullPrice: 165,
    hasPortions: true,
    image: tawaChaapImg
  },
  {
    id: 'mix-vegetable',
    name: 'Mix Vegetable',
    hindiName: 'मिक्स वेज',
    category: 'main',
    description: 'A colorful blend of seasonal cauliflower, carrots, beans, peas, and paneer cooked in aromatic spices.',
    halfPrice: 145,
    fullPrice: 210,
    hasPortions: true,
    image: chilliPaneerImg
  },
  {
    id: 'chana-masala',
    name: 'Chana Masala',
    hindiName: 'चना मसाला',
    category: 'main',
    description: 'Chickpeas cooked in Punjabi style dark spiced gravy with ginger juliennes and amchur.',
    halfPrice: 95,
    fullPrice: 165,
    hasPortions: true,
    image: tawaChaapImg
  },
  {
    id: 'egg-curry',
    name: 'Egg Curry',
    hindiName: 'अंडा करी',
    category: 'main',
    description: 'Hard-boiled eggs browned in ghee and simmered in a spiced homestyle onion and tomato curry.',
    halfPrice: 105,
    fullPrice: 175,
    hasPortions: true,
    image: tawaChaapImg
  },

  // --- CHAAP & MOMOS TANDOORI SPECIALTIES ---
  {
    id: 'tandoori-momos-spec',
    name: 'Tandoori Momos',
    hindiName: 'तंदूरी मोमोज',
    category: 'chaap_momos',
    description: 'Dumplings tossed in tandoori masala, charcoal-grilled on skewers, served with red chilli chutney & mayo.',
    halfPrice: 85,
    fullPrice: 150,
    hasPortions: true,
    image: tandooriMomosImg,
    tag: 'Crowd Favorite',
    isBestseller: true
  },
  {
    id: 'kurkure-momos-spec',
    name: 'Kurkure Momos',
    hindiName: 'कुरकुरे मोमोज',
    category: 'chaap_momos',
    description: 'Double crunchy panko crumb fried dumplings seasoned with chatpata masala and spicy dip.',
    halfPrice: 80,
    fullPrice: 140,
    hasPortions: true,
    image: tandooriMomosImg,
    tag: 'Ultra Crispy',
    isBestseller: true
  },
  {
    id: 'royal-malai-chaap-spec',
    name: 'Royal Malai Chaap',
    hindiName: 'रॉयल मलाई चाप',
    category: 'chaap_momos',
    description: 'Tender soya chaap roasted in clay tandoor, folded into dairy cream, butter, black pepper, and chaat masala.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: malaiChaapImg,
    tag: 'Muradnagar No. 1',
    isBestseller: true
  },
  {
    id: 'afghani-chaap-spec',
    name: 'Afghani Soya Chaap',
    hindiName: 'अफगानी चाप',
    category: 'chaap_momos',
    description: 'Marinated in thick hung curd, cashew paste, and white pepper, roasted with light smoky char.',
    halfPrice: 130,
    fullPrice: 200,
    hasPortions: true,
    image: heroChaapImg,
    tag: 'Smoky & Mild'
  },
  {
    id: 'tandoori-chaap-spec',
    name: 'Tandoori Soya Chaap',
    hindiName: 'तंदूरी चाप',
    category: 'chaap_momos',
    description: 'Classic red mustard oil marinade roasted in clay tandoor with onions, lemon juice, and chaat masala.',
    halfPrice: 110,
    fullPrice: 170,
    hasPortions: true,
    image: heroChaapImg,
    tag: 'Spicy Charcoal'
  },
  {
    id: 'paneer-tikka-spec',
    name: 'Tandoori Paneer Tikka',
    hindiName: 'पनीर टिक्का',
    category: 'chaap_momos',
    description: 'Generous cubes of fresh paneer, diced onions and capsicum skewered and roasted over coal.',
    halfPrice: 140,
    fullPrice: 220,
    hasPortions: true,
    image: heroChaapImg,
    tag: 'Tandoori King'
  },

  // --- STARTERS & INDO-CHINESE ---
  {
    id: 'chilli-paneer',
    name: 'Chilli Paneer',
    hindiName: 'चिली पनीर',
    category: 'starters',
    description: 'Crisp paneer cubes wok-tossed with capsicum, red onions, garlic, green chilies, and dark soy sauce.',
    halfPrice: 125,
    fullPrice: 180,
    hasPortions: true,
    image: chilliPaneerImg,
    tag: 'Indo-Chinese Star',
    isBestseller: true
  },
  {
    id: 'chilli-chaap',
    name: 'Chilli Chaap',
    hindiName: 'चिली चाप',
    category: 'starters',
    description: 'Crispy fried soya chaap chunks tossed in a tangy spicy chilli garlic Indo-Chinese sauce.',
    halfPrice: 85,
    fullPrice: 160,
    hasPortions: true,
    image: chilliPaneerImg,
    tag: 'Street Fusion'
  },
  {
    id: 'chilli-mushroom',
    name: 'Chilli Mushroom',
    hindiName: 'चिली मशरूम',
    category: 'starters',
    description: 'Batter fried fresh button mushrooms tossed with crunchy peppers, spring onion, and schezwan chili sauce.',
    halfPrice: 105,
    fullPrice: 175,
    hasPortions: true,
    image: chilliPaneerImg
  },
  {
    id: 'veg-manchurian-dry',
    name: 'Veg. Manchurian Dry',
    hindiName: 'वेज मंचूरियन ड्राई',
    category: 'starters',
    description: 'Crispy vegetable dumplings glazed with ginger, garlic, chopped chilies, and savory dark sauce.',
    halfPrice: 85,
    fullPrice: 150,
    hasPortions: true,
    image: friedRiceManchurianImg,
    tag: 'Hot & Crunchy'
  },
  {
    id: 'veg-manchurian-gravy',
    name: 'Veg. Manchurian Gravy',
    hindiName: 'वेज मंचूरियन ग्रेवी',
    category: 'starters',
    description: 'Crispy vegetable balls served in an aromatic thick garlic, soy, and spring onion gravy.',
    halfPrice: 85,
    fullPrice: 150,
    hasPortions: true,
    image: friedRiceManchurianImg
  },
  {
    id: 'paneer-manchurian',
    name: 'Paneer Manchurian',
    hindiName: 'पनीर मंचूरियन',
    category: 'starters',
    description: 'Paneer cubes tossed in zesty Manchurian glaze with scallions and garlic.',
    halfPrice: 105,
    fullPrice: 145,
    hasPortions: true,
    image: chilliPaneerImg
  },
  {
    id: 'honey-chilli-potato',
    name: 'Honey Chilli Potato',
    hindiName: 'हनी चिली पोटैटो',
    category: 'starters',
    description: 'Crispy fried potato fingers coated in a sticky sweet honey, chilli, and toasted sesame seed glaze.',
    halfPrice: 75,
    fullPrice: 105,
    hasPortions: true,
    image: chilliPaneerImg,
    tag: 'Sweet & Spicy',
    isBestseller: true
  },
  {
    id: 'chilli-potato',
    name: 'Chilli Potato',
    hindiName: 'चिली पोटैटो',
    category: 'starters',
    description: 'Crispy golden fried potato strips tossed in fiery chilli sauce with capsicum and onions.',
    halfPrice: 60,
    fullPrice: 85,
    hasPortions: true,
    image: chilliPaneerImg
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    hindiName: 'फ्रेंच फ्राइज',
    category: 'starters',
    description: 'Golden salted potato fries served with ketchup and spicy mayo.',
    fullPrice: 80,
    hasPortions: false,
    image: chilliPaneerImg
  },

  // --- RICE & BOWLS ---
  {
    id: 'veg-fried-rice',
    name: 'Veg. Fried Rice',
    hindiName: 'वेज फ्राइड राइस',
    category: 'rice',
    description: 'Aromatic long grain basmati wok-tossed with finely chopped vegetables, white pepper, and spring onions.',
    halfPrice: 65,
    fullPrice: 85,
    hasPortions: true,
    image: friedRiceManchurianImg,
    tag: 'Classic'
  },
  {
    id: 'chilli-garlic-rice',
    name: 'Chilli Garlic Rice',
    hindiName: 'चिली गार्लिक राइस',
    category: 'rice',
    description: 'Spicy stir-fried basmati rice infused with burnt garlic oil and crushed dry red chilies.',
    halfPrice: 75,
    fullPrice: 95,
    hasPortions: true,
    image: friedRiceManchurianImg,
    tag: 'Garlic Punch'
  },
  {
    id: 'singapore-rice',
    name: 'Singapore Rice',
    hindiName: 'सिंगापुरी राइस',
    category: 'rice',
    description: 'Tangy and spicy stir-fried rice seasoned with yellow curry powder, sweet and sour condiments.',
    halfPrice: 85,
    fullPrice: 120,
    hasPortions: true,
    image: friedRiceManchurianImg
  },
  {
    id: 'egg-rice',
    name: 'Egg Fried Rice',
    hindiName: 'एग फ्राइड राइस',
    category: 'rice',
    description: 'Fluffy scrambled eggs tossed with fragrant basmati, diced vegetables, and soy seasonings.',
    halfPrice: 75,
    fullPrice: 130,
    hasPortions: true,
    image: friedRiceManchurianImg
  },
  {
    id: 'triple-schezwan-rice',
    name: 'Triple Schezwan Rice',
    hindiName: 'ट्रिपल शेजवान राइस',
    category: 'rice',
    description: 'Fiery combination of Schezwan fried rice, fried noodles, and hot savory gravy.',
    halfPrice: 105,
    fullPrice: 180,
    hasPortions: true,
    image: friedRiceManchurianImg,
    tag: 'Full Feast'
  },
  {
    id: 'jeera-rice',
    name: 'Jeera Rice',
    hindiName: 'जीरा राइस',
    category: 'rice',
    description: 'Steamed premium basmati rice tempered with roasted fragrant cumin seeds and desi ghee.',
    halfPrice: 45,
    fullPrice: 70,
    hasPortions: true,
    image: friedRiceManchurianImg
  },
  {
    id: 'mattar-rice',
    name: 'Mattar Pulao / Rice',
    hindiName: 'मटर राइस',
    category: 'rice',
    description: 'Basmati rice cooked with sweet green peas and mild whole spices.',
    halfPrice: 60,
    fullPrice: 85,
    hasPortions: true,
    image: friedRiceManchurianImg
  },

  // --- TANDOORI KHAZANA & BREADS ---
  {
    id: 'butter-naan',
    name: 'Butter Naan (3 pcs)',
    hindiName: 'बटर नान (3 पीस)',
    category: 'breads',
    description: 'Soft tandoor baked leavened flatbread brushed with generous melted butter.',
    fullPrice: 70,
    hasPortions: false,
    image: tandooriNaanImg,
    tag: '3 Pieces Value',
    isBestseller: true
  },
  {
    id: 'chilly-garlic-naan',
    name: 'Chilly Garlic Naan',
    hindiName: 'चिली गार्लिक नान',
    category: 'breads',
    description: 'Topped with minced garlic, chopped green chilies, and cilantro, baked in charcoal tandoor.',
    fullPrice: 50,
    hasPortions: false,
    image: tandooriNaanImg,
    tag: 'Garlic Lovers'
  },
  {
    id: 'paneer-stuffed-naan',
    name: 'Paneer Stuffed Naan',
    hindiName: 'पनीर स्टफ्ड नान',
    category: 'breads',
    description: 'Stuffed with spiced crumbled paneer and fresh herbs, served with butter coating.',
    fullPrice: 70,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'stuffed-naan',
    name: 'Stuffed Naan (Aloo / Mix)',
    hindiName: 'स्टफ्ड नान',
    category: 'breads',
    description: 'Filled with spiced mashed potato and herb mixture, baked in tandoor.',
    fullPrice: 60,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'lachha-paratha',
    name: 'Lachha Paratha',
    hindiName: 'लच्छा पराठा',
    category: 'breads',
    description: 'Multi-layered flaky whole wheat paratha roasted crisp in the tandoor with pure ghee.',
    fullPrice: 35,
    hasPortions: false,
    image: tandooriNaanImg,
    isBestseller: true
  },
  {
    id: 'rumali-roti',
    name: 'Rumali Roti',
    hindiName: 'रूमाली रोटी',
    category: 'breads',
    description: 'Paper-thin handkerchief flatbread tossed in air and cooked on an inverted tawa.',
    fullPrice: 12,
    hasPortions: false,
    image: tandooriNaanImg,
    tag: 'Pair with Chaap'
  },
  {
    id: 'tandoori-roti',
    name: 'Tandoori Roti (Plain)',
    hindiName: 'तंदूरी रोटी (सादा)',
    category: 'breads',
    description: 'Crisp whole wheat bread roasted in clay tandoor.',
    fullPrice: 10,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'tandoori-butter-roti',
    name: 'Tandoori Butter Roti',
    hindiName: 'तंदूरी बटर रोटी',
    category: 'breads',
    description: 'Fresh clay tandoor baked wheat roti glazed with butter.',
    fullPrice: 15,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'tandoori-paneer-paratha',
    name: 'Tandoori Paneer Paratha',
    hindiName: 'तंदूरी पनीर पराठा',
    category: 'breads',
    description: 'Whole wheat paratha packed with spiced paneer stuffing, roasted with char spots.',
    fullPrice: 75,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'tandoori-mix-paratha',
    name: 'Tandoori Mix Paratha',
    hindiName: 'तंदूरी मिक्स पराठा',
    category: 'breads',
    description: 'Stuffed with seasoned potatoes, onions, and mixed veggies.',
    fullPrice: 60,
    hasPortions: false,
    image: tandooriNaanImg
  },
  {
    id: 'tandoori-aloo-paratha',
    name: 'Tandoori Aloo Paratha',
    hindiName: 'तंदूरी आलू पराठा',
    category: 'breads',
    description: 'Classic spiced mashed potato filled paratha roasted in tandoor.',
    fullPrice: 50,
    hasPortions: false,
    image: tandooriNaanImg
  },

  // --- ROLLS ---
  {
    id: 'special-chaap-roll',
    name: 'Special Chaap Kathi Roll',
    hindiName: 'स्पेशल चाप रोल',
    category: 'rolls',
    description: 'Flaky rumali bread stuffed with juicy spiced chaap pieces, mint chutney, and onion rings.',
    halfPrice: 75,
    fullPrice: 120,
    hasPortions: true,
    image: tawaChaapImg,
    tag: 'Street Legend',
    isBestseller: true
  },
  {
    id: 'paneer-roll',
    name: 'Paneer Tikka Roll',
    hindiName: 'पनीर टिक्का रोल',
    category: 'rolls',
    description: 'Charcoal grilled cottage cheese chunks wrapped with tangy chutney and crispy onions.',
    halfPrice: 85,
    fullPrice: 140,
    hasPortions: true,
    image: heroChaapImg,
    tag: 'Quick Bite'
  }
];

const REVIEWS = [
  {
    name: 'Rohan Sharma',
    role: 'Muradnagar Local Guide',
    comment: 'Best Tandoori Momos and UP-14 Special Paneer in Muradnagar! The smokiness from their clay tandoor and the fiery red chutney is unmatched. Perfect late-night food spot.',
    rating: 5,
    tag: 'Tandoori Momos'
  },
  {
    name: 'Priya Chaudhary',
    role: 'College Student & Foodie',
    comment: 'Malai chaap literally melts in the mouth! Extremely pocket-friendly prices (all under ₹200) and the owner is genuinely polite and humble.',
    rating: 5,
    tag: 'Malai Chaap'
  },
  {
    name: 'Aman Tyagi',
    role: 'Regular Night Customer',
    comment: 'Our go-to late-night craving spot. Even at 12:15 AM, they serve piping hot, freshly grilled chaap. Fast free delivery and clean packaging in Radhey Shyam Vihar.',
    rating: 5,
    tag: 'Late Night Spot'
  },
  {
    name: 'Deepak Kumar',
    role: 'Muradnagar Resident',
    comment: 'The Dal Makhni with Butter Naan and Tawa Chaap is pure heaven. Great flavor balance, authentic Delhi NCR street taste right here in Muradnagar.',
    rating: 5,
    tag: 'Tawa Chaap'
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTabMode, setActiveTabMode] = useState<'cards' | 'menu_board'>('cards');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [orderCustomerName, setOrderCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerAddress, setCustomerAddress] = useState('');

  // Portions state map: default to Half when available, otherwise Standard
  const [selectedPortions, setSelectedPortions] = useState<{ [key: string]: 'Half' | 'Full' }>(() => {
    const map: { [key: string]: 'Half' | 'Full' } = {};
    OFFICIAL_MENU_ITEMS.forEach((item) => {
      if (item.hasPortions) {
        map[item.id] = 'Half';
      }
    });
    return map;
  });

  const PHONE_PRIMARY = '08750221122';
  const PHONE_SECONDARY = '07060354450';
  const WHATSAPP_NUMBER = '918750221122';
  const ADDRESS = 'Radhey Shyam Vihar, Phase - I, Muradnagar, Ghaziabad, Uttar Pradesh 201206';

  const filteredItems = useMemo(() => {
    return OFFICIAL_MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hindiName.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const handlePortionChange = (itemId: string, portion: 'Half' | 'Full') => {
    setSelectedPortions((prev) => ({
      ...prev,
      [itemId]: portion
    }));
  };

  const addToCart = (item: MenuItem) => {
    const portion = item.hasPortions ? selectedPortions[item.id] || 'Half' : 'Standard';
    const price = portion === 'Full' ? item.fullPrice : (item.halfPrice || item.fullPrice);
    const cartItemId = `${item.id}-${portion}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { id: cartItemId, itemId: item.id, name: item.name, portion, price, quantity: 1 }
      ];
    });
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const getDirectWhatsAppUrl = (item?: MenuItem) => {
    if (item) {
      const portion = item.hasPortions ? (selectedPortions[item.id] || 'Half') : 'Standard';
      const price = portion === 'Full' ? item.fullPrice : (item.halfPrice || item.fullPrice);
      const text = encodeURIComponent(
        `Hello UP 14 Restaurant & Party Hall (Muradnagar)!\nI would like to order:\n• 1x ${item.name} (${portion}) - ₹${price}\n\nPlease confirm availability & preparation time.`
      );
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }

    if (cart.length > 0) {
      let itemsList = cart
        .map(
          (item) => `• ${item.quantity}x ${item.name} (${item.portion}) - ₹${item.price * item.quantity}`
        )
        .join('\n');
      let customer = orderCustomerName ? `*Customer:* ${orderCustomerName}\n` : '';
      let typeText = `*Order Type:* ${deliveryType === 'delivery' ? 'Free Home Delivery' : 'Pickup / Takeaway'}\n`;
      let addrText = customerAddress ? `*Delivery Address:* ${customerAddress}\n` : '';
      let note = orderNote ? `*Instructions:* ${orderNote}\n` : '';

      const message = `*Order - UP 14 Restaurant & Party Hall (Muradnagar)*\n\n${customer}${typeText}${addrText}${note}\n*Items:*\n${itemsList}\n\n*Total Amount:* ₹${cartTotal}\n\nPlease confirm my order!`;
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    const defaultMsg = encodeURIComponent(
      'Hello UP 14 Restaurant & Party Hall! I would like to check the menu and place an order for Muradnagar.'
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(ADDRESS);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. IMMERSIVE TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Mark */}
          <a href="#" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-600 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight flex items-center gap-1.5">
                UP 14 <span className="text-orange-500 font-black">RESTAURANT</span>
              </span>
              <span className="text-[11px] text-neutral-400 font-medium tracking-wide flex items-center gap-1">
                <span>पार्टी हॉल & चाप जंक्शन</span>
                <span className="text-neutral-600">·</span>
                <span className="text-emerald-400 font-semibold">Free Delivery</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <a href="#menu" className="hover:text-orange-400 transition-colors">Official Menu</a>
            <a href="#specialties" className="hover:text-orange-400 transition-colors">Specialties</a>
            <a href="#vibe" className="hover:text-orange-400 transition-colors">The Vibe</a>
            <a href="#reviews" className="hover:text-orange-400 transition-colors">Reviews</a>
            <a href="#location" className="hover:text-orange-400 transition-colors">Location & Hours</a>
          </nav>

          {/* Action Zone: WhatsApp CTA & Cart Trigger */}
          <div className="flex items-center gap-3">
            {/* Cart tray button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-orange-500/60 text-neutral-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="View Order Tray"
            >
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              {cartTotal > 0 && (
                <span className="text-xs font-semibold tabular-nums text-white">
                  ₹{cartTotal}
                </span>
              )}
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0d0d0f] animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UP 14 Restaurant, I want to place an order from the official menu!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-neutral-800 flex flex-col gap-3 pb-2 text-sm">
            <a
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200"
            >
              Official Digital Menu (Full Catalog)
            </a>
            <a
              href="#specialties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200"
            >
              Signature Specialties
            </a>
            <a
              href="#vibe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200"
            >
              Why Muradnagar Loves Us
            </a>
            <a
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200"
            >
              Customer Reviews (4.0 ★)
            </a>
            <a
              href="#location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200"
            >
              Location & Hours
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: 8750221122
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE_PRIMARY}`}
                  className="text-center py-2 rounded-lg bg-neutral-800 text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  8750221122
                </a>
                <a
                  href={`tel:${PHONE_SECONDARY}`}
                  className="text-center py-2 rounded-lg bg-neutral-800 text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  7060354450
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-800/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-orange-600/15 via-red-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Trust Badges Bar */}
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Free Home Delivery in Muradnagar
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.0 (259+ Reviews)
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-300">Open Daily till 12:30 AM</span>
              </div>

              {/* Bold Appetizing Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-4 text-balance">
                UP 14 Restaurant <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 bg-clip-text text-transparent">& Party Hall</span>
              </h1>
              <p className="text-sm font-semibold text-orange-400/90 mb-3 tracking-wide">
                UP 14 FOOD पॉइंट & चाप जंक्शन · Radhey Shyam Vihar, Muradnagar
              </p>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-6 max-w-2xl">
                Explore our official restaurant menu! From sizzling Tandoori Momos & Royal Malai Chaap to rich Paneer Butter Masala, Dal Makhni, and fresh clay oven Naan. Order on WhatsApp with free home delivery.
              </p>

              {/* Action Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
                <a
                  href="#menu"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <UtensilsCrossed className="w-4 h-4 text-white" />
                  <span>Browse Full Official Menu</span>
                  <ChevronRight className="w-4 h-4 text-orange-200" />
                </a>

                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: 8750221122</span>
                </a>
              </div>

              {/* Phone Badges */}
              <div className="flex items-center gap-3 flex-wrap text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">Direct Order Lines:</span>
                <a href={`tel:${PHONE_PRIMARY}`} className="text-white hover:text-orange-400 font-mono font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-orange-400" /> 8750221122
                </a>
                <span className="text-neutral-600">/</span>
                <a href={`tel:${PHONE_SECONDARY}`} className="text-white hover:text-amber-400 font-mono font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-400" /> 7060354450
                </a>
              </div>
            </div>

            {/* Right Media Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-700/80 bg-neutral-900 shadow-2xl shadow-orange-950/40 group">
                <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                  <img
                    src={heroChaapImg}
                    alt="Smoky Tandoori Chaap at UP 14 Restaurant Muradnagar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-black/20" />
                </div>

                <div className="p-5 bg-gradient-to-b from-[#141416] to-[#0f0f10] border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Chef's Bestseller
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      Free Delivery
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    UP-14 Special Paneer & Tandoori Chaap
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4 line-clamp-2">
                    Our signature house recipe simmered in creamy cashew gravy, paired with hot crispy butter naans straight from the charcoal tandoor.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                    <div>
                      <span className="text-[11px] text-neutral-500 block">Pocket-friendly dining</span>
                      <span className="text-base font-extrabold text-white">₹95 - ₹230 per dish</span>
                    </div>

                    <a
                      href={getDirectWhatsAppUrl(OFFICIAL_MENU_ITEMS[0])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-orange-600/90 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      Instant Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL DIGITAL MENU SECTION (With Search, Tabs & Portion Selectors) */}
      <section id="menu" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-orange-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Official Restaurant Menu Board</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Official Digital Menu & Online Ordering
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Accurate dishes and prices straight from our Muradnagar menu board. Select Half or Full portions and send your order straight to our kitchen on WhatsApp.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTabMode('cards')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTabMode === 'cards'
                  ? 'bg-orange-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Visual Cards
            </button>
            <button
              onClick={() => setActiveTabMode('menu_board')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTabMode === 'menu_board'
                  ? 'bg-orange-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Restaurant Board View
            </button>
          </div>
        </div>

        {/* Search Bar & Category Segmented Controls */}
        <div className="space-y-4 mb-8">
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paneer, chaap, momos, dal, rice, naan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'main', label: 'Main Course (Gravies & Paneer)' },
              { id: 'chaap_momos', label: 'Tandoori Chaap & Momos' },
              { id: 'starters', label: 'Starters & Chinese' },
              { id: 'rice', label: 'Fried Rice & Bowls' },
              { id: 'breads', label: 'Tandoori Roti & Naan' },
              { id: 'rolls', label: 'Kathi Rolls' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-950/40'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* VIEW MODE 1: VISUAL CARDS GRID */}
        {activeTabMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const currentPortion = selectedPortions[item.id] || 'Half';
              const displayPrice = item.hasPortions
                ? currentPortion === 'Full'
                  ? item.fullPrice
                  : (item.halfPrice || item.fullPrice)
                : item.fullPrice;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-[#121215] border border-neutral-800/80 hover:border-orange-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-orange-950/20 hover:-translate-y-1"
                >
                  {/* Food Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/20" />

                    {/* Tag badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-orange-300 border border-white/10">
                        {item.tag}
                      </div>
                    )}

                    {item.isBestseller && (
                      <div className="absolute top-3 right-3 bg-red-600/95 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-[11px] text-neutral-500 font-medium whitespace-nowrap">
                          {item.hindiName}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Portion Selector & Pricing */}
                    <div className="pt-3 border-t border-neutral-800/80">
                      {item.hasPortions ? (
                        <div className="flex items-center justify-between mb-3 bg-neutral-900/90 p-1 rounded-lg border border-neutral-800">
                          <span className="text-[11px] text-neutral-400 pl-1 font-medium">Portion:</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handlePortionChange(item.id, 'Half')}
                              className={`px-2.5 py-0.5 text-xs font-semibold rounded cursor-pointer transition-all ${
                                currentPortion === 'Half'
                                ? 'bg-orange-600 text-white'
                                : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              Half (₹{item.halfPrice})
                            </button>
                            <button
                              onClick={() => handlePortionChange(item.id, 'Full')}
                              className={`px-2.5 py-0.5 text-xs font-semibold rounded cursor-pointer transition-all ${
                                currentPortion === 'Full'
                                  ? 'bg-orange-600 text-white'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              Full (₹{item.fullPrice})
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3 text-[11px] text-neutral-400 font-medium">
                          Standard Portion
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">Price</span>
                          <span className="text-lg font-extrabold text-white tabular-nums">
                            ₹{displayPrice}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border border-neutral-700"
                            title="Add to order tray"
                          >
                            <Plus className="w-3.5 h-3.5 text-orange-400" />
                            <span>Add</span>
                          </button>

                          <a
                            href={getDirectWhatsAppUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs transition-colors flex items-center justify-center cursor-pointer shadow-md shadow-orange-600/30"
                            title="Order directly on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: AUTHENTIC RESTAURANT BOARD VIEW (Like the physical printed board) */}
        {activeTabMode === 'menu_board' && (
          <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase font-mono text-orange-400">UP 14 FOOD POINT & PARTY HALL</span>
                <h3 className="text-xl font-bold text-white">Complete Restaurant Rate Card</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Home Delivery
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">Call: 8750221122, 7060354450</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['main', 'starters', 'rice', 'breads', 'chaap_momos', 'rolls'].map((catKey) => {
                const itemsInCat = OFFICIAL_MENU_ITEMS.filter((i) => i.category === catKey);
                if (itemsInCat.length === 0) return null;

                const catTitles: { [key: string]: string } = {
                  main: 'Main Course Specialties',
                  starters: 'Starters & Chinese',
                  rice: 'Rice & Bowls',
                  breads: 'Tandoori Khazana / Breads',
                  chaap_momos: 'Chaap & Momos Junction',
                  rolls: 'Kathi Rolls'
                };

                return (
                  <div key={catKey} className="rounded-2xl bg-neutral-950/70 p-4 border border-neutral-800/80">
                    <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider pb-3 mb-3 border-b border-neutral-800 flex items-center justify-between">
                      <span>{catTitles[catKey]}</span>
                      <span className="text-[11px] font-mono text-neutral-500">Half / Full</span>
                    </h4>

                    <div className="space-y-2.5">
                      {itemsInCat.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 text-xs py-1 hover:bg-neutral-900/60 px-1.5 rounded transition-colors"
                        >
                          <div className="flex flex-col flex-1">
                            <span className="font-semibold text-white">{item.name}</span>
                            <span className="text-[10px] text-neutral-500">{item.hindiName}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {item.hasPortions ? (
                              <span className="font-mono text-neutral-300 tabular-nums">
                                ₹{item.halfPrice} / ₹{item.fullPrice}
                              </span>
                            ) : (
                              <span className="font-mono text-neutral-300 tabular-nums">
                                ₹{item.fullPrice}
                              </span>
                            )}

                            <button
                              onClick={() => addToCart(item)}
                              className="p-1 rounded bg-neutral-800 hover:bg-orange-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                              title="Add to tray"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 4. THE UP 14 EXPERIENCE / VIBE SECTION */}
      <section id="vibe" className="py-16 bg-[#0f0f12] border-y border-neutral-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
              Why Muradnagar Loves Us
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The UP 14 Food Point Experience
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Uncompromising taste, sizzling hot clay tandoor flavor, free doorstep delivery, and party hosting in Radhey Shyam Vihar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vibe Card 1 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 relative overflow-hidden group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Late Night Cravings (Till 12:30 AM)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Hungry after midnight? When other food spots close down, our tandoor is still fired up. We serve fresh, steaming momos and chaap till 12:30 AM every single day.
              </p>
              <div className="mt-4 text-xs font-semibold text-orange-400 flex items-center gap-1">
                <span>Midnight cravings solved</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Vibe Card 2 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 relative overflow-hidden group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Free Home Delivery in Muradnagar
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Order directly on WhatsApp or phone! We deliver hot and fresh meals right to your doorstep across Muradnagar without heavy aggregator commissions.
              </p>
              <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>Free doorstep delivery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Vibe Card 3 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 relative overflow-hidden group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Restaurant & Party Hall Bookings
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Celebrating a birthday, anniversary, or family gathering? Book our party hall for delicious catering packages at unbeatable per-person prices.
              </p>
              <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>Party bookings available</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE WHATSAPP MENU BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="rounded-3xl p-8 lg:p-12 bg-gradient-to-r from-orange-950/70 via-neutral-900 to-amber-950/50 border border-orange-500/30 shadow-2xl shadow-orange-950/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Direct Kitchen Helpline
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
              Order on WhatsApp or Call for Free Delivery
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Connect with our staff on 8750221122 or 7060354450 for immediate dispatch, custom spices, or party reservations in Muradnagar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UP 14 Restaurant! Please take my order from the official menu.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: 87502 21122</span>
            </a>

            <a
              href={`tel:${PHONE_SECONDARY}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call: 7060354450</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF / CUSTOMER LOVE */}
      <section id="reviews" className="py-16 max-w-7xl mx-auto px-4 lg:px-8 w-full border-t border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-orange-400 uppercase mb-2">
              Verified Customer Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Loved by 259+ Muradnagar Foodies
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Rated 4.0 stars on Google Reviews for taste, hygiene, and generous portions.
            </p>
          </div>

          {/* Rating Summary Badge */}
          <div className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-black text-xl">
              4.0
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-neutral-400 block mt-0.5">259+ Google Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 bg-neutral-800/80 px-2 py-0.5 rounded">
                    {review.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80">
                <div className="font-bold text-white text-xs">{review.name}</div>
                <div className="text-[11px] text-neutral-500">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LOCATION, HOURS & DIRECT CONTACT CARD */}
      <section id="location" className="py-16 bg-[#0c0c0e] border-t border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="text-xs font-semibold tracking-wider text-orange-400 uppercase mb-2">
                Visit & Contact
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                UP 14 Restaurant & Party Hall
              </h2>
              <p className="text-sm text-neutral-400 mb-6">
                Radhey Shyam Vihar, Phase - I, Muradnagar, Ghaziabad. We offer dine-in, party hall booking, takeaway, and free home delivery.
              </p>

              <div className="space-y-4 mb-6">
                {/* Address Box */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-bold block mb-0.5">Address</span>
                      <p className="text-sm font-medium text-white leading-snug">
                        {ADDRESS}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={copyAddressToClipboard}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors shrink-0"
                    title="Copy full address"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Operating Hours Box */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-neutral-400 uppercase font-bold block mb-0.5">Operating Hours</span>
                    <p className="text-sm font-medium text-white">
                      Open Daily: 11:00 AM – 12:30 AM (Late Night)
                    </p>
                    <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">
                      • Kitchen active through midnight hours
                    </span>
                  </div>
                </div>

                {/* Dual Phone Numbers Box */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="text-xs text-neutral-400 uppercase font-bold block mb-1">Kitchen & Delivery Lines</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono">87502 21122</span>
                        <a href={`tel:${PHONE_PRIMARY}`} className="text-xs font-semibold text-orange-400 hover:underline">
                          Call
                        </a>
                      </div>
                      <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono">70603 54450</span>
                        <a href={`tel:${PHONE_SECONDARY}`} className="text-xs font-semibold text-amber-400 hover:underline">
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Navigation Details */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 p-6 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-400">MURADNAGAR LANDMARK</span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Free Delivery
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Google Maps & Directions
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    Radhey Shyam Vihar Phase - I, easily accessible from the Delhi-Meerut Highway. Click below for real-time driving directions.
                  </p>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col gap-2 mb-6 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Establishment:</span>
                      <span className="text-white font-medium">UP 14 RESTAURANT & PARTY HALL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Location:</span>
                      <span className="text-white font-medium">Radhey Shyam Vihar, Phase - I</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Postal Code:</span>
                      <span className="text-white font-mono">201206 (Muradnagar, Ghaziabad)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Pure Veg:</span>
                      <span className="text-emerald-400 font-medium">Pure Veg Dishes + Egg Curry Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=UP+14+Restaurant+Food+Point+Radhey+Shyam+Vihar+Muradnagar+Ghaziabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UP 14, please send your Google Maps location pin!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Location</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. IMMERSIVE FOOTER */}
      <footer className="mt-auto bg-[#070709] border-t border-neutral-900 py-12 px-4 lg:px-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">
                UP 14 Restaurant & Party Hall
              </span>
              <span className="text-neutral-500 text-[11px]">
                UP 14 FOOD पॉइंट & चाप जंक्शन · Radhey Shyam Vihar, Muradnagar
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <a href="#menu" className="hover:text-white transition-colors">Official Menu</a>
            <a href="#vibe" className="hover:text-white transition-colors">Free Delivery</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#location" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-center md:text-right text-neutral-500">
            <div>Phone: 8750221122, 7060354450</div>
            <div className="mt-1">© {new Date().getFullYear()} UP 14 Restaurant. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OVER WHATSAPP ORDER TRAY (CART DRAWER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-[#121215] border-l border-neutral-800 h-full flex flex-col z-10 shadow-2xl">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">Your Order Tray</h3>
                  <span className="text-[11px] text-emerald-400">Free Home Delivery in Muradnagar</span>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-500 mx-auto mb-3">
                    <UtensilsCrossed className="w-7 h-7" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">Your tray is empty</h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                    Pick your favorite items from our official menu—Paneer Butter Masala, Dal Makhni, Malai Chaap, or Naan—and send your order on WhatsApp!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-semibold"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Order Type Toggle */}
                  <div className="p-1 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center text-xs font-semibold">
                    <button
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        deliveryType === 'delivery'
                          ? 'bg-orange-600 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Free Delivery
                    </button>
                    <button
                      onClick={() => setDeliveryType('takeaway')}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        deliveryType === 'takeaway'
                          ? 'bg-orange-600 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Takeaway / Pickup
                    </button>
                  </div>

                  {/* Item List */}
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">{item.name}</div>
                        <div className="text-xs text-neutral-400">
                          {item.portion !== 'Standard' ? `${item.portion} · ` : ''}₹{item.price} each
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white tabular-nums w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="w-7 h-7 rounded-lg hover:bg-red-950/50 text-neutral-500 hover:text-red-400 flex items-center justify-center ml-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Customer Inputs */}
              {cart.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anshul / Rohit"
                      value={orderCustomerName}
                      onChange={(e) => setOrderCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                        Muradnagar Delivery Address
                      </label>
                      <input
                        type="text"
                        placeholder="House no, Colony / Landmark, Muradnagar"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Cooking Notes / Special Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra spicy, extra green chutney, less oil"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer with Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-800 bg-neutral-900/90">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">Total Bill</span>
                    <span className="text-[10px] text-emerald-400 font-medium">Free Home Delivery</span>
                  </div>
                  <span className="text-xl font-black text-white tabular-nums">
                    ₹{cartTotal}
                  </span>
                </div>

                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp (87502 21122)</span>
                </a>

                <p className="text-[11px] text-neutral-500 text-center mt-2.5">
                  Sends formatted order items directly to UP 14 WhatsApp Kitchen
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING ACTION PILL FOR QUICK WHATSAPP CALL / CART */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs shadow-2xl shadow-orange-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-2 ring-orange-400/50"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Order Tray ({totalCartCount})</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full tabular-nums">
              ₹{cartTotal}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
