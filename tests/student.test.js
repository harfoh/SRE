const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Student = require('../src/models/student');

// Mock all Student model methods
jest.mock('../src/models/student');

console.log(Student.create); // Check if Student.create is mocked

describe('Student API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close the connection after all tests
  });

  it('should create a new student', async () => {
    const mockStudent = { _id: '1', name: 'John Doe', age: 18, grade: 'A' };
    Student.create.mockResolvedValue(mockStudent);

    try {
      const res = await request(app)
        .post('/api/v1/students')
        .send({ name: 'John Doe', age: 18, grade: 'A' });

      console.log('Response:', res.body); // Log response to inspect
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockStudent);
      expect(Student.create).toHaveBeenCalledWith({ name: 'John Doe', age: 18, grade: 'A' });
    } catch (error) {
      console.error('Error:', error); // Log error for debugging
    }
  });

  it('should retrieve all students', async () => {
    const mockStudents = [{ _id: '1', name: 'Alice', age: 20, grade: 'B' }];
    Student.find.mockResolvedValue(mockStudents);

    const res = await request(app).get('/api/v1/students');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockStudents);
    expect(Student.find).toHaveBeenCalledTimes(1);
  });

  it('should retrieve a student by ID', async () => {
    const mockStudent = { _id: '2', name: 'Bob', age: 22, grade: 'C' };
    Student.findById.mockResolvedValue(mockStudent);

    const res = await request(app).get('/api/v1/students/2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockStudent);
    expect(Student.findById).toHaveBeenCalledWith('2');
  });

  it('should update a student', async () => {
    const mockStudent = { _id: '3', name: 'Charlie', age: 21, grade: 'A' };
    Student.findByIdAndUpdate.mockResolvedValue(mockStudent);

    const res = await request(app)
      .put('/api/v1/students/3')
      .send({ grade: 'A' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockStudent);
    expect(Student.findByIdAndUpdate).toHaveBeenCalledWith('3', { grade: 'A' }, { new: true });
  });

  it('should delete a student', async () => {
    const mockStudent = { _id: '4', name: 'Delete Test', age: 18, grade: 'C' };
    Student.findByIdAndDelete.mockResolvedValue(mockStudent);

    const res = await request(app).delete('/api/v1/students/4');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Student deleted');
    expect(Student.findByIdAndDelete).toHaveBeenCalledWith('4');
  });
});

describe('Health Check', () => {
  it('should return API status as UP', async () => {
    const res = await request(app).get('/api/healthcheck');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'UP' });
  });
});
