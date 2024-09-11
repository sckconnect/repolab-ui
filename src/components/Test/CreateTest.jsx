// src/components/Test/CreateTest.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CreateTest = () => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [tests, setTests] = useState([]);
  
  useEffect(() => {
    fetchTests();
  }, []);
 // var baseUrl = "http://localhost:5000/api"

 const API_BASE_URL = "http://localhost:5000/api"; // Replace with actual base URL

  const handleCreate = async () => {
    const testData = { testName, description };

    try {
      const addedTest = await addTest(testData);
      // Optionally, update the state with the newly added test
     // setTests((prevTests) => [addedTest, ...prevTests]);
      setTestName(''); // Clear input fields
      setDescription('');
      fetchTests();
    } catch (error) {
     // setError('Failed to add test.');
      console.error('Error adding test:', error);
    }
  };
  // Function to Add a Test
const addTest = async (testData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/TestType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add test: ${response.statusText}`);
    }

    const result = await response.json();
    // Extract and return the Data object from the response
    return result.Data;
  } catch (error) {
    console.error('Error adding test:', error);
    throw error;
  }
};

  const handleUpdate = (id) => {
    // Implement update logic
  };

  // Function to Get All Tests
const getAllTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/TestType`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tests: ${response.statusText}`);
    }

    const result = await response.json();
    // Extract and return the Data array from the response
    return result.Data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};

const fetchTests = async () => {
  try {
    const testsData = await getAllTests();
    setTests(testsData);
  } catch (error) {
   // setError('Failed to load tests.');
    console.error('Error fetching tests:', error);
  }
};

  return (
    <Box>
      <Typography variant="h5">Create Master Test Configuration</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <TextField
          label="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Existing Tests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>{test.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleUpdate(test.id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default CreateTest;
