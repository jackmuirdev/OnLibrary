using Backend.Entities;
using Stripe;

namespace Backend.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var subtotal = basket.Items.Sum(i => i.Quantity * i.Product.Price);
            var deliveryFee = subtotal > 10000 ? 0 : 500;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "gbp",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
            }
            else
            {
                var paymentIntent = await service.GetAsync(basket.PaymentIntentId);
                
                if (paymentIntent.Status != "succeeded")
                {
                    var options = new PaymentIntentUpdateOptions
                    {
                        Amount = subtotal + deliveryFee
                    };
                    await service.UpdateAsync(basket.PaymentIntentId, options);
                }
                else
                {
                    // Handle case where PaymentIntent is already succeeded
                    // For example, log an error or notify the user
                    // You can add appropriate logging or error handling here
                    // For demonstration purposes, let's log a message
                    Console.WriteLine("PaymentIntent is already succeeded. No update needed.");
                }
            }

            return intent;
        }
    }
}