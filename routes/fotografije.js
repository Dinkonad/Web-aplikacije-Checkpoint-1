import express from "express";
import { fotografije, fotografi } from "../data/podatci.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json(fotografije);
});


// PROBATI U TERMINALU curl -X POST http://localhost:3000/fotografije -H "Content-Type: application/json" -d "{\"naziv\": \"Morski pejzaž\", \"opis\": \"Pogled na more iz Zadra\", \"fotografId\": 5, \"datum\": \"2025-11-10\"}"
router.post("/", (req, res) => {
  const nova = req.body;

  const Postoji = fotografi.some(foto => foto.id === nova.fotografId);
  if (!Postoji) {
    return res.status(400).json({ message: "Taj fotograf ne postoji" });
  }
  nova.id = fotografije.length + 1;
  fotografije.push(nova);
  res.status(200).json({
    message: "Dodavanje nove fotografije",
    fotografija: nova
  });
});


router.put("/:id", (req, res) => {
  const trazenid = parseInt(req.params.id);
  const novafotografija = req.body;
  const index = fotografije.findIndex(foto => foto.id === trazenid);
  if (index === -1) {
    return res.status(404).json({ message: "Fotografija nije pronađena" });
  }
  const fotografPostoji = fotografi.some(foto => foto.id === novafotografija.fotografId);
  if (!fotografPostoji) {
    return res.status(400).json({ message: "Taj fotograf ne postoji" });
  }
  novafotografija.id = trazenid;
  fotografije[index] = novafotografija;
  res.status(200).json({
    message: "Fotografija uspješno ažurirana",
    fotografija: novafotografija
  });
});


router.delete("/:fotografid", (req,res) => {
    const id= parseInt(req.params.fotografid); 
    const index = fotografije.findIndex(foto => foto.fotografId === id); 

   if (index !== -1) {
    const obrisan = fotografije.splice(index, 1);
    res.json({
      message: "Fotograf obrisan" ,
      obrisano: obrisan[0] 
    });
  } else {
    res.status(404).json({ message: "Fotograf nije pronađen" });
  }
})


router.patch("/:naziv", (req, res) => {
  const trazennaziv = req.params.naziv;
  const { opis } = req.body;
  const fotografija = fotografije.find(foto => foto.naziv === trazennaziv);
  if (!fotografija) {
    return res.status(404).json({ message: "Fotografija nije pronađena" });
}
  fotografija.opis = opis;
  res.status(200).json({
    message: "Opis uspješno promijenjen",
    fotografija
  });
});

export default router;
