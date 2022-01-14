import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";

interface TooltipButtonProps {
  btnText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function TooltipButton({ btnText, onClick }: TooltipButtonProps) {
  const [tooltipText, setTooltipText] = useState("Click To Copy");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(e);
    setTooltipText("Copied");
    setTimeout(() => {
      setTooltipText("Click To Copy");
    }, 1000);
  };

  return (
    <Tooltip title={tooltipText} placement="right">
      <Button
        variant="text"
        size="small"
        sx={{ textTransform: "none", userSelect: "all" }}
        onClick={handleClick}
      >
        {btnText}
      </Button>
    </Tooltip>
  );
}

export default TooltipButton;
