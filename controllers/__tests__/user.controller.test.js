
const { createUser, getUsers } = require('../user/user.controller');
const { db } = require('../../models');
const { User, Role, UserActivity } = db;

// Mocking the request and response objects
const mockRequest = (body = {}, query = {}) => ({
  body,
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mocking the models
jest.mock('../../models', () => ({
  db: {
    User: {
      create: jest.fn(),
      findAndCountAll: jest.fn(),
    },
    Role: {
      findOne: jest.fn(),
    },
    UserActivity: jest.fn(),
  },
}));

describe('User Controller', () => {
  describe('getUsers', () => {
    it('should fetch all users with valid query parameters', async () => {
      const req = mockRequest({}, { role: 'Admin', active: 'true', pageSize: '10', page: '1', sort: 'createdAt', order: 'ASC' });
      const res = mockResponse();

      Role.findOne.mockResolvedValue({ id: 1, name: 'Admin' });
      User.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: new Date().toISOString(),
          Role: { name: 'Admin' },
          UserActivity: { is_active: true },
        }],
      });

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: 'Fetched all users!',
        totalUsers: 1,
        currentPage: 1,
        totalPages: 1,
        users: expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            is_active: true,
            created_at: expect.any(String),
          }),
        ]),
      }));
    });

    it('should handle internal server error', async () => {
      const req = mockRequest({}, { role: 'Admin', active: 'true' });
      const res = mockResponse();

      User.findAndCountAll.mockImplementation(() => { throw new Error('Test Error'); });

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
      });
    });
  });
});
