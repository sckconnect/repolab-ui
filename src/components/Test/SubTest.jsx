// src/components/Test/SubTest.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const SubTest = () => {
  const [testTypes, setTestTypes] = useState([]);
  const [selectedTestType, setSelectedTestType] = useState('');
  const [subTestName, setSubTestName] = useState('');
  const [description, setDescription] = useState('');
  const [referenceValue, setReferenceValue] = useState('');
  const [measureType, setUnits] = useState('');
  const [subTests, setSubTests] = useState([]);
  const API_BASE_URL = "http://localhost:5000/api"; // Replace with actual base URL

  useEffect(() => {
    // Fetch test types
  
       // Fetch test types
       fetch('http://localhost:5000/api/TestType')
       .then((res) => res.json())
       .then((data) => {
         // Assuming data.Data contains the list of doctors
         if (data.ResponseCode === 200 && Array.isArray(data.Data)) {
           setTestTypes(data.Data); // Set the 'Data' array from the API response
         } else {
           console.error("Failed to fetch doctors");
           setTestTypes([]);
         }
       })
       .catch((err) => console.error(err));

       fetchSubTests();

  }, []);


  const handleCreate = async () => {
    const payload = {
      testTypeId: selectedTestType,
      subTestName,
      description,
      referenceValue,
      measureType,
    };

    try {
      const addedSubTest = await addSubTest(payload);
      // Optionally, update the state with the newly added test
     // setTests((prevTests) => [addedTest, ...prevTests]);
     // setTestName(''); // Clear input fields
     // setDescription('');
      fetchSubTests();
    } catch (error) {
     // setError('Failed to add test.');
      console.error('Error adding test:', error);
    }
  };

  // Function to Get All Tests
const getAllSubTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/TestType/SubTest`, {
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

const fetchSubTests = async () => {
  try {
    const testsData = await getAllSubTests();
    setSubTests(testsData);
  } catch (error) {
   // setError('Failed to load tests.');
    console.error('Error fetching tests:', error);
  }
};

   // Function to Add a Test
const addSubTest = async (testData) => {
  try {
    const response = await fetch('http://localhost:5000/api/TestType/SubTest', {
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

  return (
    <Box>
      <Typography variant="h5">Create Sub Test</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <TextField
          select
          label="Test Type"
          value={selectedTestType}
          onChange={(e) => setSelectedTestType(e.target.value)}
          margin="normal"
          required
        >
          {testTypes.map((test) => (
            <MenuItem key={test.id} value={test.id}>
              {test.testName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Sub Test Name"
          value={subTestName}
          onChange={(e) => setSubTestName(e.target.value)}
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
        <TextField
          label="Reference Value"
          value={referenceValue}
          onChange={(e) => setReferenceValue(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Units"
          value={measureType}
          onChange={(e) => setUnits(e.target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Existing Sub Tests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sub Test Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reference Value</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subTests.map((subTest) => (
              <TableRow key={subTest.id}>
                <TableCell>{subTest.id}</TableCell>
                <TableCell>{subTest.subTestName}</TableCell>
                <TableCell>{subTest.description}</TableCell>
                <TableCell>{subTest.referenceValue}</TableCell>
                <TableCell>{subTest.measureType}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleUpdate(subTest.id)}>
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

export default SubTest;
