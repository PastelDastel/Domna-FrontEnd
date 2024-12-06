import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DeleteIcon from "@mui/icons-material/Delete";


export default function CourseForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      section: "",
      duration: "Mensile",
      price: "",
      stripePriceId: "",
      benefits: [""],
      excludedBenefits: [""],
      categories: [""],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const { fields: benefitFields, append: addBenefit, remove: removeBenefit } =
    useFieldArray({
      control,
      name: "benefits",
    });

  const {
    fields: excludedBenefitFields,
    append: addExcludedBenefit,
    remove: removeExcludedBenefit,
  } = useFieldArray({
    control,
    name: "excludedBenefits",
  });

  const { fields: categoryFields, append: addCategory, remove: removeCategory } =
    useFieldArray({
      control,
      name: "categories",
    });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 4,
        backgroundColor: "#FFC0CB",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Modifica Corso
      </Typography>

      <Typography variant="h6">Informazioni Generali</Typography>
      <TextField label="Titolo" {...register("title")} fullWidth />
      <TextField
        label="Descrizione"
        {...register("description")}
        fullWidth
        multiline
        rows={4}
      />
      <Box display="flex" gap={2}>
        <TextField label="Istruttore" {...register("instructor")} fullWidth />
        <TextField label="Sezione" {...register("section")} fullWidth />
      </Box>

      <Typography variant="h6">Durata</Typography>
      <Select {...register("duration")} fullWidth defaultValue="Mensile">
        <MenuItem value="Mensile">Mensile</MenuItem>
        <MenuItem value="Trimestrale">3 Mesi</MenuItem>
        <MenuItem value="Semestrale">6 Mesi</MenuItem>
        <MenuItem value="Annuale">1 Anno</MenuItem>
      </Select>

      <Typography variant="h6">Prezzi</Typography>
      <Box display="flex" gap={2}>
        <TextField label="Prezzo" {...register("price")} fullWidth />
        <TextField
          label="ID Prezzo Stripe"
          {...register("stripePriceId")}
          fullWidth
        />
      </Box>

      <Typography variant="h6">Benefici</Typography>
      {benefitFields.map((item, index) => (
        <Box key={item.id} display="flex" gap={2} alignItems="center">
          <TextField
            {...register(`benefits.${index}`)}
            fullWidth
            placeholder="Aggiungi un beneficio"
          />
          <IconButton onClick={() => removeBenefit(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={() => addBenefit("")}
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Aggiungi Beneficio
      </Button>

      <Typography variant="h6">Benefici Esclusi</Typography>
      {excludedBenefitFields.map((item, index) => (
        <Box key={item.id} display="flex" gap={2} alignItems="center">
          <TextField
            {...register(`excludedBenefits.${index}`)}
            fullWidth
            placeholder="Aggiungi un beneficio escluso"
          />
          <IconButton onClick={() => removeExcludedBenefit(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={() => addExcludedBenefit("")}
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Aggiungi Beneficio Escluso
      </Button>

      <Typography variant="h6">Categorie</Typography>
      {categoryFields.map((item, index) => (
        <Box key={item.id} display="flex" gap={2} alignItems="center">
          <TextField
            {...register(`categories.${index}`)}
            fullWidth
            placeholder="Aggiungi una categoria"
          />
          <IconButton onClick={() => removeCategory(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={() => addCategory("")}
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Aggiungi Categoria
      </Button>

      <Box display="flex" gap={2} justifyContent="space-between" mt={3}>
        <Button variant="outlined" color="secondary">
          Annulla
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Salva Modifiche
        </Button>
      </Box>
    </Box>
  );
}
