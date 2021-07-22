import React from "react";
import CategoryIcon from "../Category/CategoryIcon";
// Material UI
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import http from "../../redux/Actions/http";
import { useParams, useHistory } from "react-router-dom";
import { deleteLog } from "../../redux/Actions/LogsAtions";

const LogHeader = ({ log, onDelete, toggle, isUpdate }) => {
  let { id } = useParams();
  let history = useHistory();
  return (
    <>
      <Box pb={2} display="flex" alignItems="baseline">
        <CategoryIcon
          iconName={log._category.icon}
          color={log._category.color}
          size="large"
          on
        />
        <Box flexGrow={1} pl={2}>
          <Typography variant="h4">
            {log.title || log._category?.title || log.note}
          </Typography>
        </Box>
        <IconButton
          color="secondary"
          onClick={async () => {
            const [done, error] = await http(deleteLog(id));
            if (error) return;
            if (done) history.push("/");
          }}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
        <IconButton color="primary" onClick={toggle}>
          {isUpdate ? (
            <CloseIcon color="primary" />
          ) : (
            <EditIcon color="primary" />
          )}
        </IconButton>
      </Box>
      <Box pb={2}>
        <Divider />
      </Box>
    </>
  );
};

export default LogHeader;
