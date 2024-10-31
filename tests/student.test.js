const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

jest.setTimeout(10000); // Increase timeout

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await mongoose.connection.collection('students').deleteMany({});
});

describe('Student API', () => {
  it('should create a new student', async () => {
    const res = await request(app).post('/api/v1/students').send({ name: 'John', age: 18, grade: 'A' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve all students', async () => {
    await request(app).post('/api/v1/students').send({ name: 'John', age: 18, grade: 'A' });
    const res = await request(app).get('/api/v1/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Check that at least one student is returned
  });

  it('should update a student', async () => {
    const res = await request(app).post('/api/v1/students').send({ name: 'Jane', age: 20, grade: 'B' });
    const studentId = res.body._id;

    const updateRes = await request(app).put(`/api/v1/students/${studentId}`).send({ grade: 'A+' });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.grade).toBe('A+'); // Ensure this matches your API response
  });

  it('should delete a student', async () => {
    const res = await request(app).post('/api/v1/students').send({ name: 'Delete Test', age: 18, grade: 'C' });
    const studentId = res.body._id;

    const deleteRes = await request(app).delete(`/api/v1/students/${studentId}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe('Student deleted'); // Ensure this matches your API response
  });
});
