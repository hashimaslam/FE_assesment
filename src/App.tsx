import React, { useCallback, useState } from "react";
import "./App.css";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBar from "./components/SearchBar";
import { BasicAccordion } from "./components/BasicAccordion";
import celebs from "./celebrities.json";
import { IData } from "./types/types";
import DeleteDialog from "./components/DeleteDialog";

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>(celebs);
  const [mainData, setMainData] = useState<IData[]>(celebs);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currId, setCurrId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = (values: any) => {
    let updatedData = mainData.map((item: { id: number }) => {
      if (item.id === values.id) {
        return values;
      }
      return item;
    });
    setData(updatedData);
    setMainData(updatedData);
  };
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleDelete = useCallback(() => {
    if (currId !== 0) {
      let updatedData = mainData.filter((item) => item.id !== currId);
      setMainData(updatedData);
      setData(updatedData);

      setOpen(false);
    }
  }, [currId]);
  const handleClickOpen = (id: number) => {
    setCurrId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrId(0);
    setOpen(false);
  };
  return (
    <Box py="30px" px="20px" m="0 auto" maxWidth="700px">
      <Box>
        <Typography component="h2" fontSize="24px" fontWeight={500}>
          List view
        </Typography>
        <Box mt="20px">
          <SearchBar setData={setData} mainData={mainData} />
        </Box>
        <Box mt="20px">
          {data.map((item: IData) => {
            return (
              <BasicAccordion
                first={item.first}
                last={item.last}
                dob={item.dob}
                gender={item.gender}
                picture={item.picture}
                country={item.country}
                description={item.description}
                id={item.id}
                key={item.id}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                handleSubmit={handleSubmit}
                expanded={expanded == item.id}
                onChangeAccord={handleChange}
                handleDelete={handleDelete}
                open={open}
                handleClickOpen={handleClickOpen}
              />
            );
          })}
          {data.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              fontSize="22px"
              fontWeight={500}
            >
              No result found
            </Box>
          )}
        </Box>
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
          id={1}
        />
      </Box>
    </Box>
  );
};

export default App;
