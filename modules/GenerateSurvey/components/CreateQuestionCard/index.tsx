import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import TypeField from "../TypeField";

import TypeOptions from "../TypeOptions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeQuestionState } from "../../../../slices/CreateSurvey";

const CreateQuestionCard = ({ id: questionId }) => {
  const { question } = useAppSelector((state) =>
    state.createSurvey.createSurvey?.find((survey) => survey.id === questionId)
  );
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Question"
            sx={{ width: "45%" }}
            value={question}
            onChange={(e) => {
              dispatch(
                changeQuestionState({
                  key: "question",
                  value: e.target.value,
                  questionId,
                })
              );
            }}
          />
          <TypeField id={questionId} sx={{ width: "45%" }} />
        </Box>
        <Box mt={4}>
          <TypeOptions id={questionId} />
        </Box>
      </CardContent>
      <CardActions>
        {/*TODO: Add later*/}
        {/*<FormControlLabel*/}
        {/*  control={<Switch defaultChecked={false} />}*/}
        {/*  label="Required"*/}
        {/*/>*/}
      </CardActions>
    </Card>
  );
};

export default CreateQuestionCard;
