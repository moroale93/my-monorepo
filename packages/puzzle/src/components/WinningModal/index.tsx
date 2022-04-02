import {Modal, ModalProps} from '@mui/material';
import {Box} from '@mui/system';

export default function WinningModal({children, ...props}: ModalProps) {
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'common.white',
          borderRadius: '4px',
          boxShadow: 24,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
