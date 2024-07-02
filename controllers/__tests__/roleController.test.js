const { createRole, getRole } = require('../user/role.controller');
const { db } = require('../../models');
const { Role } = db;

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

describe('Role Controller', () => {
  beforeAll(async () => {
    // Connect to your test database or set up any necessary mocks
    await db.sequelize.sync(); // Ensure database is synced for testing
  });

  afterAll(async () => {
    // Close connections or clean up after tests if necessary
    await db.sequelize.close();
  });

  describe('createRole', () => {
    it('should create a new role with valid input', async () => {
      const req = mockRequest({ name: 'Admin' });
      const res = mockResponse();

      await createRole(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: 'Role Created Successfully!',
        role: expect.objectContaining({
          id: expect.any(Number),
          name: 'Admin',
        //   createdAt: expect.any(String), // Assuming createdAt field is present
        }),
      }));

      const responseJson = res.json.mock.calls[0][0];
      expect(new Date(responseJson.role.createdAt).toISOString()).toBeISODateString();
      expect(new Date(responseJson.role.updatedAt).toISOString()).toBeISODateString();
    });
  }
  
);

  describe('getRole', () => {
    it('should fetch all roles', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await getRole(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: 'Fetched all role!',
        TotalRole: expect.any(Number),
        roles: expect.any(Array),
      }));
    });

    it('should handle errors when fetching roles', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      // Mock Role.findAll to throw an error
      Role.findAll = jest.fn().mockImplementation(() => {
        throw new Error('Internal server error');
      });

      await getRole(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });
});
