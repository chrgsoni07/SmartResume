// TemplateCard.tsx
import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Dialog, DialogContent } from '@mui/material';

interface TemplateCardProps {
  image: string;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ image, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ minHeight: '280px', width: 320 }}>
        <CardMedia component="img" height="280" image={image} alt="Template Thumbnail" onClick={handleClickOpen} />
        <CardContent>
          <Button variant="contained" color="primary" onClick={onSelect}>
            Select
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={image} alt="Template Full" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateCard;
