const { createProduct } = require('../../controllers/products/product.controller');
const { db } = require('../../models');
const { Product } = db;

// Mocking the request and response objects
const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('createProduct controller', () => {
  beforeAll(async () => {
    // Connect to your test database or set up any necessary mocks
    await db.sequelize.sync(); // Ensure database is synced for testing
  });

  afterAll(async () => {
    // Close connections or clean up after tests if necessary
    await db.sequelize.close();
  });

  it('should create a new product with valid input', async () => {
    const req = mockRequest({
      name: 'Test Product',
      description: 'Testing product creation',
      category: 'electronics',
      price: 500,
      available: true,
    });
    const res = mockResponse();

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: 'Product created successfully',
      product: expect.objectContaining({
        id: expect.any(Number),
        name: 'Test Product',
        description: 'Testing product creation',
        category: 'electronics',
        price: 500,
        available: true,
        // Commenting out the direct check to handle it separately
        // created_at: expect.toBeISODateString(),
      }),
    }));

    // Separate assertion for the created_at field
    const responseJson = res.json.mock.calls[0][0];
    expect(new Date(responseJson.product.created_at).toISOString()).toBeISODateString();
  });

  it('should create a new product with valid input and price above threshold with approval code', async () => {
    const req = mockRequest({
      name: 'High Price Product',
      description: 'Testing product creation with high price',
      category: 'electronics',
      price: 1500,
      available: true,
      approval_code: 'APPROVE123',
    });
    const res = mockResponse();

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: 'Product created successfully',
      product: expect.objectContaining({
        id: expect.any(Number),
        name: 'High Price Product',
        description: 'Testing product creation with high price',
        category: 'electronics',
        price: 1500,
        available: true,
      }),
    }));

    // Separate assertion for the created_at field
    const responseJson = res.json.mock.calls[0][0];
    expect(new Date(responseJson.product.created_at).toISOString()).toBeISODateString();
  });


  it('should return error for invalid category', async () => {
    const req = mockRequest({
      name: 'Invalid Category Product',
      description: 'Testing invalid category',
      category: 'invalid-category',
      price: 300,
      available: true,
    });
    const res = mockResponse();

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      message: 'Invalid category',
    }));
  });

  
});
