import Image from "next/image";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212644435352" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 bg-white p-2 rounded-full border border-green-500 shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
    >
      <Image
        src="/whatsapp.svg" // Make sure the path to the image is correct
        alt="WhatsApp"
        className="h-10 w-10"
        width={48}
        height={48}
      />
    </a>
  );
};

export default WhatsAppButton;
