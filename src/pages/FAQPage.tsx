
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is binary options trading?",
      answer: "Binary options trading is a form of financial trading where you predict whether the price of an asset will go up or down within a specific time frame. If your prediction is correct, you earn a fixed payout. If incorrect, you lose your investment amount."
    },
    {
      question: "What is the minimum deposit amount?",
      answer: "You can start trading with Binoryx with just $1. This is one of the lowest minimum deposits in the industry, making trading accessible to everyone."
    },
    {
      question: "What assets can I trade?",
      answer: "Binoryx offers a wide range of trading assets including major forex pairs (EUR/USD, GBP/USD, etc.), cryptocurrencies (Bitcoin, Ethereum, etc.), commodities (Gold, Oil, etc.), and stock indices."
    },
    {
      question: "How do I withdraw my profits?",
      answer: "You can withdraw your profits through various methods including JazzCash, Easypaisa, bank transfer, and USDT. Withdrawals are typically processed within 24 hours."
    },
    {
      question: "What are the trading timeframes available?",
      answer: "We offer flexible trading timeframes ranging from 5 seconds to 4 hours. You can choose from 5s, 15s, 30s, 1m, 2m, 5m, 1h, and 4h options based on your trading strategy."
    },
    {
      question: "What is the maximum payout percentage?",
      answer: "Binoryx offers competitive payouts up to 95% on successful trades. The exact payout percentage varies depending on the asset and market conditions."
    },
    {
      question: "Is KYC verification required?",
      answer: "Yes, KYC (Know Your Customer) verification is required for security and regulatory compliance. You'll need to provide identity documents, proof of address, and a selfie with your ID."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our customer support team is available 24/7 through live chat, email (support@binoryx.com), and phone (+1 555-123-4567). We're always here to help you."
    },
    {
      question: "Are there any trading fees?",
      answer: "Binoryx doesn't charge trading fees. We only charge small fees on withdrawals to cover processing costs. Deposit fees vary by payment method."
    },
    {
      question: "Can I use a demo account?",
      answer: "Yes, we offer demo accounts for new traders to practice and learn without risking real money. Demo accounts come with virtual funds to test your strategies."
    },
    {
      question: "What happens if I lose internet connection during a trade?",
      answer: "If you lose connection during a trade, don't worry. The trade will continue to execute based on your initial parameters. You can check the result once you're back online."
    },
    {
      question: "How secure is my money with Binoryx?",
      answer: "Your funds are protected with bank-grade security measures including 256-bit SSL encryption, segregated accounts, and regulatory compliance. We prioritize the security of your investments."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about trading with Binoryx
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions? */}
          <div className="text-center mt-16 p-8 bg-muted rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Contact Support
              </a>
              <a href="mailto:support@binoryx.com" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default FAQPage;
