    import  {   test as basetest  } from '@playwright/test';
    
export const Customtest = basetest.extend({
  testdataorder: [
    {
      userEmail: "jswati12@gmail.com",
      password: "Data@1234",
      productname: "ZARA COAT 3",
      cvv: "111",
      cardname: "Swati Jain",
      countryname: " India",
      Expectedmessage: "Thankyou for the order."
    },
       {scope: 'test'}

    ]
});