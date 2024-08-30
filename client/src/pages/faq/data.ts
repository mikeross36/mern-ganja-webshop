import nextId from "react-id-generator";

export type ItemType = {
  id: string;
  title: string;
  content: string;
};

export const accordionItems = [
  {
    id: nextId(),
    title: "What forms of payment do you take?",
    content:
      "We accept debit cards and cash. We also have ATMs located in every store for your convenience.",
  },
  {
    id: nextId(),
    title: "What taxes are charged for adult-use customers? ",
    content:
      "On average, about 25% of your final bill is attributed to taxes. Getting a more accurate number depends on THC percentage. In Illinois, you’ll pay a state tax based on the products you buy. Here’s how state taxes break down:10% tax on cannabis products with 35% THC or less,25% tax on cannabis products with 35% THC or more,20% tax on THC-infused cannabis products (edibles, tonics, liquids), 8-11% tax on all cannabis products, set by each town and county a store is located in.",
  },
  {
    id: nextId(),
    title: "How do I place an online order?",
    content:
      "Ordering online is easy at GanjaWebshop. If it’s your first time, you’ll need to register with us first. Then select your store and customer type, then add products to your cart from our real-time inventory. Once you’re done, hit submit and you’re all set! We’ll shoot you an email or text confirming that we’ve received your order.",
  },
  {
    id: nextId(),
    title: "How do I cancel an online order?",
    content:
      "After submitting your order online, simply scroll to the bottom of your order and click 'cancel order'. You can also navigate to the 'Order History' tab at the top right of the screen, (next to the cart icon), and select 'cancel order'.",
  },
  {
    id: nextId(),
    title: "Can you help me shop for products?",
    content:
      "Of course! We’d be happy to help you find products to fit your lifestyle. You can call or chat with us during normal business hours or email us anytime.",
  },
  {
    id: nextId(),
    title: "When do I need to pick up my order?",
    content:
      "We’ll send you a confirmation via email/text indicating that your order is ready for pick-up. When you arrive at the store, please show your order confirmation email/text to the security guard at the door. We fulfill orders on a first-come, first-serve basis. After a two-hour hold time, your product may be released to other customers. If you pick-up by end of business day, we will do our best to fulfill your request, but some products may not be available.",
  },
  {
    id: nextId(),
    title: "What do I need to know before I go?",
    content:
      "Before you come in, there are a few important things to remember: Be sure to bring your valid ID and order confirmation, you’ll need it to check in. We prefer debit card payment, but also accept cash and have ATMs for your convenience. If for some reason you can’t make it in, let us know by contacting us ",
  },
  {
    id: nextId(),
    title: "How often is your online menu updated?",
    content:
      "Our live menu is constantly being updated to reflect the current inventory available at our stores.",
  },
  {
    id: nextId(),
    title: "Can I purchase in GanjaWebshop shops as a recreational tourist? ",
    content:
      "Yes! You can shop freely in GanjaWebshop, as long as you have a valid government issued photo ID from any state or country showing you are 21+. Just know that the total amount visitors can buy is often lower and you cannot cross state lines with anything you buy. ",
  },
];
