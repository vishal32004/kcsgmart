import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import BulkInquiryForm from "./forms/BulkEnquiryForm";

const VideoModal = () => {
  return (
    <Dialog>
      <div className="flex flex-col items-center gap-2 w-[90%] text-center md:w-auto uppercase text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <p className="font-semibold">Procter Assurance</p>
        <h2 className="font-bold text-[20px]">
          Perfect Corporate Gifting Solutions for your Company
        </h2>
        <DialogTrigger className="play-modal">
          <Play />
        </DialogTrigger>
      </div>
      <DialogContent className="min-w-[90%] bg-[#0000] border-none flex justify-center">
        <video
          src="video/procter-promo-video.mp4"
          controls
          className="w-[50%] h-auto rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;

type BulkEnquiryFormDialogProps = {
  isBulkInquiryOpen: boolean;
  setIsBulkInquiryOpen: (boolean: boolean) => void;
};
export const BulkEnquiryFormDialog = ({
  isBulkInquiryOpen,
  setIsBulkInquiryOpen,
}: BulkEnquiryFormDialogProps) => {
  return (
    <Dialog open={isBulkInquiryOpen} onOpenChange={setIsBulkInquiryOpen}>
      <DialogContent className="lg:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Bulk Inquiry</DialogTitle>
          <DialogDescription>
            Please fill out the form below for your bulk inquiry.
          </DialogDescription>
        </DialogHeader>
        <BulkInquiryForm />
      </DialogContent>
    </Dialog>
  );
};
