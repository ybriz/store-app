export const environment = {
  production: true,
  apiUrl: 'assets/test.json',
  productimagesUrl: (manufacturerID: number) => `http://images.repzio.com/productimages/${manufacturerID}/logo${manufacturerID}_lg.jpg`
};
