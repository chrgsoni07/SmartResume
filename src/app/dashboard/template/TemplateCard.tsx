import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// StyledCard to position the button over the image
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  minHeight: '280px',
  width: 320,
  '& .button': {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem', // Smaller font size
    padding: theme.spacing(0.5, 1), // Smaller padding
    borderRadius: theme.shape.borderRadius,
  },
}));

interface TemplateCardProps {
  id: string;
  image: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ id, image }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = () => {
    navigate(`/dashboard/template/${id}`); // Navigate to the details page with template id
  };

  return (
    <>
      <StyledCard>
        <CardMedia
          component="img"
          height="280"
          image={image}
          alt="Template Thumbnail"
          onClick={handleClickOpen}
          sx={{ objectFit: 'cover' }}
        />
        <Button className="button" variant="contained" onClick={handleSelect}>
          Select
        </Button>
      </StyledCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={image} alt="Template Full" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateCard;
