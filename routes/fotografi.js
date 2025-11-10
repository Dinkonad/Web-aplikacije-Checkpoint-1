import express from "express";
import { fotografi } from "../data/podatci.js";

const router = express.Router();


router.get("/" , (req,res) => {
res.status(200).json(fotografi)

});


router.get("/:ime" , (req,res ) => { 
const trazeno_ime = req.params.ime; 
const trazeno = fotografi.find(foto => foto.ime == trazeno_ime); 

if(trazeno) {
    res.status(200).json(trazeno); 
} else {
    res.status(404).json( { message: "Fotograf nije pronađen"})
}
});


router.post("/", (req, res) => {
 const novi_fotograf = req.body;
 if (novi_fotograf.ocjena > 5) {
    return res.status(400).json({ message: "Ocjena ne može biti veća od 5" });
  }

  if (novi_fotograf.ocjena < 1) {
    return res.status(400).json({ message: "Ocjena ne može biti manja od 1" });
  }
  novi_fotograf.id = fotografi.length + 1;
  fotografi.push(novi_fotograf);
  res.status(200).json({
    message: "Fotograf uspješno dodan",
    fotograf: novi_fotograf
  });
});


router.delete("/:id", (req, res) => {
  const obrisi_id = parseInt(req.params.id);
  const index = fotografi.findIndex(ind => ind.id === obrisi_id);
  if (index !== -1) {
    const obrisan = fotografi.splice(index, 1);
    res.json({
      message: "Fotograf obrisan" ,
      obrisano: obrisan[0] 
    });
  } else {
    res.status(404).json({ message: "Fotograf nije pronađen" });
  }
});


router.patch("/:id", (req, res) => {
  const trazenid = parseInt(req.params.id);
  const { ocjena } = req.body;
  const fotograf = fotografi.find(foto => foto.id === trazenid);
  if (!fotograf) {
    return res.status(404).json({ message: "Fotograf nije pronađen" });
  }
  if (ocjena > 5) {
    return res.status(400).json({ message: "Ocjena ne može biti veća od 5" });
  }
  if (ocjena < 1) {
    return res.status(400).json({ message: "Ocjena ne može biti manja od 1" });
  }
  fotograf.ocjena = ocjena;
  res.json({
    message: "Ocjena uspješno promijenjena",
    fotograf
  });
});




export default router;
