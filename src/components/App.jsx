import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import Pusher from 'pusher-js';
import React, { useEffect, useState } from "react";
import usePartNotification from "../hooks/usePartNotification";

const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://iam.com/">
<soapenv:Header/>
<soapenv:Body>
    <tns:getEtudiants>
    </tns:getEtudiants>
</soapenv:Body>
</soapenv:Envelope>`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #e2e2e2',
  boxShadow: 24,
  p: 2,

  borderRadius: "8px",

};


const App = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [addModelOpen, setModelOpen] = useState(false);

  const [student, setStudent] = useState({ });
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [filiere, setFiliere] = useState("");


  const handleOpen = (student) => {
    setOpen(true);
    setStudent(student);
  };
  const handleClose = () => {
    setOpen(false);
    setNom("");
    setPrenom("");
    setDateNaissance("");
    setFiliere("");

  };

  const handleOpenAddModel = (student) => {
    setModelOpen(true);
    setStudent(student);
  };

  const handleCloseAddModel = () => {
    setModelOpen(false);
    setNom("");
    setPrenom("");
    setDateNaissance("");
    setFiliere("");
  };



  const notification = usePartNotification();


  console.log(notification);




  useEffect(() => {
    const sendRequest = async () => {

      const response = await axios.post(
        "http://localhost:8080/scolarite?wsdl",
        soapRequest,
        {
          headers: {
            "Content-Type": "text/xml",
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const x = xmlDoc.querySelectorAll("return");

      const arr = [];

      x.forEach((element) => {
        const obj = {
          id: element.querySelector("id").innerHTML,
          nom: element.querySelector("nom").innerHTML,
          prenom: element.querySelector("prenom").innerHTML,
          dateNaissance: element.querySelector("dateNaissance").innerHTML,
          filiere: element.querySelector("filiere").innerHTML,
        };
        arr.push(obj);
      });

      setData(arr);
    };

    sendRequest();

    
  }, [ ]);
 


  const handelUpdate = () => {

    const etudiant = {
      id: student.id,
      nom: nom || student.nom,
      prenom: prenom || student.prenom,
      dateNaissance: dateNaissance || student.dateNaissance,
      filiere: filiere || student.filiere,
    };

    console.log(student);

    const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://iam.com/">
    <soapenv:Header/>
    <soapenv:Body>
        <tns:updateEtudiant>
            
                <id>${etudiant.id}</id>
                <nom>${etudiant.nom}</nom>
                <prenom>${etudiant.prenom}</prenom>
                <dateNaissance>${etudiant.dateNaissance}</dateNaissance>
                <filiere>${etudiant.filiere}</filiere>
            
        </tns:updateEtudiant>
    </soapenv:Body>
    </soapenv:Envelope>`;

    const sendRequest = async () => {
      const response = await axios.post(
        "http://localhost:8080/scolarite?wsdl",
        soapRequest,
        {
          headers: {
            "Content-Type": "text/xml",
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const x = xmlDoc.querySelector("return").innerHTML;

      console.log(x);
    };

    sendRequest();

    // update state of students
    const arr = [...data];
    const index = arr.findIndex((item) => item.id === student.id);
    arr[index] = etudiant;
    setData(arr);

    // update state of student
    setStudent(etudiant);

    // close modal
    handleClose();
  }

  const handeladd = () => {
      
      const etudiant = {
        id: student.id,
        nom: nom || student.nom,
        prenom: prenom || student.prenom,
        dateNaissance: dateNaissance || student.dateNaissance,
        filiere: filiere || student.filiere,
      };

      if (!etudiant.nom || !etudiant.prenom || !etudiant.dateNaissance || !etudiant.filiere) {
        alert("veuillez remplir tous les champs");
        return;
      }
  
  
      const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://iam.com/">
      <soapenv:Header/>
      <soapenv:Body>
          <tns:addEtudiant>
              
                  <id>${etudiant.id}</id>
                  <nom>${etudiant.nom}</nom>
                  <prenom>${etudiant.prenom}</prenom>
                  <dateNaissance>${etudiant.dateNaissance}</dateNaissance>
                  <filiere>${etudiant.filiere}</filiere>
              
          </tns:addEtudiant>
      </soapenv:Body>
      </soapenv:Envelope>`;
  
      const sendRequest = async () => {
        const response = await axios.post(
          "http://localhost:8080/scolarite?wsdl",
          soapRequest,
          {
            headers: {
              "Content-Type": "text/xml",
            },
          }
        );
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const x = xmlDoc.querySelector("return").innerHTML;
  
        console.log(x);
      };
  
      sendRequest();
  
      // add the new student to the state
      const arr = [...data];
      arr.push(etudiant);
      setData(arr);

      // update state of student
      setStudent(etudiant);
  
      // close modal
      handleCloseAddModel();
    }

  const handelDelete = () => {
    const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://iam.com/">
    <soapenv:Header/>
    <soapenv:Body>
        <tns:deleteEtudiant>
            <id>${student.id}</id>
        </tns:deleteEtudiant>
    </soapenv:Body>
    </soapenv:Envelope>`;

    const sendRequest = async () => {
      const response = await axios.post(
        "http://localhost:8080/scolarite?wsdl",
        soapRequest,
        {
          headers: {
            "Content-Type": "text/xml",
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const x = xmlDoc.querySelector("return").innerHTML;

      console.log(x);
    };

    sendRequest();

    // delete the student from the state
    const arr = [...data];
    const index = arr.findIndex((item) => item.id === student.id);
    arr.splice(index, 1);
    setData(arr);

    // close modal
    handleClose();
  }


  return (
    <>

    <Box sx={{
      width: "100%",
      height: "56px",
      backgroundColor: "#1c1c1c",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 16px",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "20px",
      marginBottom: "16px",

    }}>

      <Typography variant="h6" component="div">
        Liste des etudiants
      </Typography>

      <Button  className="add-btn" variant="contained" color="primary" sx={{backgroundColor: "#f1f1f1", color:"#000"}} onClick={handleOpenAddModel}>
        Ajouter
      </Button>
      
    </Box>

    <Grid
      container
      spacing={{ xs: 2, md: 2}}
      columns={{ xs: 4, sm: 8, md: 12,  }}
    >
      {data.map((student) => (
        <Grid item xs={6} sm={4} md={3} key={student.id}  onClick={() => handleOpen(student)} sx={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          
        }}>
          <Card sx={{width:345, height: 125 }}>
            <CardActionArea sx={{height:'100%'}} >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {student.nom} {student.prenom}
                </Typography>

                  <Typography variant="body2" color="text.secondary">
                    filiere : {student.filiere}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    date de naissance  : {new Date(student.dateNaissance).toDateString().slice(4)}
                  </Typography>
                
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {student?.nom} {student?.prenom}
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}  style={{marginTop:"16px"}} >
            
            <FormControl fullWidth   sx={{display:"flex", flexDirection:'row', mb:"12px",gap:"6px"}}>
            <TextField defaultValue={student.nom}  placeholder={student.nom}  name="nom" label="Nom"  onChange={(e) => setNom(e.target.value)} fullWidth />
            <TextField defaultValue={student.prenom}   placeholder={student.prenom} name="prenom" label="Prenom" onChange={(e) => setPrenom(e.target.value)} fullWidth />
            </FormControl>

            <Autocomplete

        onChange={(event, newValue) => setFiliere(newValue) }
  id="filiere"
  options={["GI", "IAM", "SIR", "TM"]}
  fullWidth
  renderInput={(params) => <TextField {...params} label="Filiere" />}
  defaultValue={student.filiere}
/>
            
            <FormControl name="dateNaissance" fullWidth sx={{mb:"12px"}}>
              <FormLabel>Date de naissance</FormLabel>
              <DatePicker  
              defaultValue={dayjs(student.dateNaissance)}
              onChange={(newValue) => setDateNaissance(dayjs(newValue).format("YYYY-MM-DD"))}
               />
            </FormControl>
            <Button variant="contained" type="submit" onClick={handelUpdate}  fullWidth>
              Modifier
            </Button>

            <Button variant="contained" color="error" onClick={handelDelete} type="submit" fullWidth sx={{mt:"12px"}}>
              Supprimer
            </Button>

          </form>
        </Box>
      </Modal>

      <Modal
        open={addModelOpen}
        onClose={handleCloseAddModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter un etudiant
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}  style={{marginTop:"16px"}} >
            
            <FormControl fullWidth   sx={{display:"flex", flexDirection:'row', mb:"12px",gap:"6px"}}>
            <TextField required   name="nom" label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} fullWidth />
            <TextField required   name="prenom" label="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} fullWidth />
            </FormControl>

            <Autocomplete  onChange={(event, newValue) => setFiliere(newValue) } id="filiere" options={["GI", "IAM", "SIR", "TM"]} fullWidth renderInput={(params) => <TextField {...params} required label="Filiere" />}  />

            <FormControl name="dateNaissance" fullWidth sx={{mb:"12px"}}>
              <FormLabel>Date de naissance</FormLabel>
              <DatePicker
              
              onChange={(newValue) => setDateNaissance(dayjs(newValue).format("YYYY-MM-DD"))}
               />
            </FormControl>
            <Button variant="contained" type="submit" onClick={handeladd}  fullWidth>
              Ajouter
            </Button>


          </form>
        </Box>
      </Modal>
    </>
  );
};

export default App;



