import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import { ChangeEvent, FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const SingleChoice: FC<AnswerProps> = ({ question, index, update }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(index, {
      question: question.question,
      questionId: question.id,
      answers: [e.target.value],
    });
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h4">{question?.question}</Typography>
        </Box>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {question?.options?.map((option) => {
              return (
                <FormControlLabel
                  control={<Radio value={option.text} onChange={onChange} />}
                  label={option.text}
                  onChange={onChange}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SingleChoice;
