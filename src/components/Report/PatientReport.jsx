// src/components/Report/PatientReport.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const PatientReport = () => {
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [testTypes, setTestTypes] = useState([]);
  const [subTests, setSubTests] = useState([]);
  const [selectedTestType, setSelectedTestType] = useState('');
  const [selectedSubTest, setSelectedSubTest] = useState('');
  const [observedValue, setObservedValue] = useState('');
  const [addedSubTests, setAddedSubTests] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    // Fetch test types
    fetch('http://localhost:5000/api/DoctorDetails')
      .then((res) => res.json())
      .then((data) => {
        // Assuming data.Data contains the list of doctors
        if (data.ResponseCode === 200 && Array.isArray(data.Data)) {
          setDoctors(data.Data); // Set the 'Data' array from the API response
        } else {
          console.error("Failed to fetch doctors");
          setDoctors([]);
        }
      })
      .catch((err) => console.error(err));

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

  }, []);

  const handleAddSubTest = () => {
    const subTest = subTests.find((st) => st.id === selectedSubTest);
    if (subTest && observedValue) {
      setAddedSubTests([
        ...addedSubTests,
        { ...subTest, observedValue, id: Date.now() },
      ]);
      // Reset fields
      setSelectedTestType('');
      setSelectedSubTest('');
      setObservedValue('');
    }
  };

  const handleCreateReport = () => {
    const payload = {
      patientName,
      gender,
      age,
      doctorId: doctor,
      date,
      subTests: addedSubTests.map((st) => ({
        subTestId: st.id,
        observedValue: st.observedValue,
      })),
    };

    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Report Created Successfully');
        // Reset form
        setPatientName('');
        setGender('');
        setAge('');
        setDoctor('');
        setDate('');
        setAddedSubTests([]);
      })
      .catch((err) => console.error(err));
  };

  const handleTestChange = (event) => {
    const selectedTestId = event.target.value;
    setSelectedTestType(selectedTestId);

    // Fetch subTests based on the selected Test
    fetch(`http://localhost:5000/api/TestType/SubTest`) // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ResponseCode === 200 && Array.isArray(data.Data)) {
          setSubTests(data.Data); // Set the subTests state
  
        } else {
          console.error("Invalid response or Data is not an array.");
        }
      })
      .catch((err) => {
        console.error("Error fetching subTests: ", err);
      });
  };
  const handleUpdateReport = (reportId) => {
    // Implement update logic
  };


  return (
    <Box>
      <Typography sx={{ textAlign : 'center'}} variant="h5">Create Patient Report</Typography>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
          <TextField
              label="Patient Id"
              value={patientName}
             // onChange={(e) => setPatientName(e.target.value)}
              fullWidth
              aria-readonly
            />
               </Grid> 

               <Grid item xs={12} sm={3}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
               <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Doctor</InputLabel>
      
      <Select
                value={doctor}
                label="Doctor"
                onChange={(e) => setDoctor(e.target.value)}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.doctorName} ({doctor.degree})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

              <Grid item xs={12} sm={6}>
            <TextField
              label="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              required
            />
          </Grid>
         
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{textAlign : 'center' , mb : 2}} variant="h5">Add Test Results</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Test Type</InputLabel>
              <Select
                value={selectedTestType}
                label="Test Type"
                onChange={handleTestChange}
              >
                {testTypes.map((test) => (
                  <MenuItem key={test.id} value={test.id}>
                    {test.testName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sub Test</InputLabel>
              <Select
                value={selectedSubTest}
                label="Sub Test"
                onChange={(e) => setSelectedSubTest(e.target.value)}
                disabled={!selectedTestType}
              >
                {subTests.map((st) => (
                  <MenuItem key={st.id} value={st.id}>
                    {st.subTestName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Observed Value"
              value={observedValue}
              onChange={(e) => setObservedValue(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" onClick={handleAddSubTest}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, textAlign :'center' }}>
        <Button variant="contained" color="primary" onClick={handleCreateReport}>
          Create Report
        </Button>
        <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => handleUpdateReport()}>
          Update Report
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Test Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sub Test Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reference Value</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Observed Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedSubTests.map((st) => (
              <TableRow key={st.id}>
                <TableCell>{st.subTestName}</TableCell>
                <TableCell>{st.description}</TableCell>
                <TableCell>{st.referenceValue}</TableCell>
                <TableCell>{st.units}</TableCell>
                <TableCell>{st.observedValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

    
    </Box>
  );
};

export default PatientReport;
