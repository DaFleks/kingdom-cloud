import Container from "@/components/aetherium/Container";
import GameForm from "@/components/GameForm";
import formBackground from "@/public/images/form-wallpaper.jpg";
import GameFormSidePanel from "@/components/GameFormSidePanel";
import GameFormWrapper from "@/components/GameFormWrapper";

const page = async () => {
  return (
    <Container
      className="w-full h-full m-auto border border-slate-500 grid grid-cols-3 
    md:w-2/3 lg:w-2/3">
      <GameFormSidePanel src={formBackground.src} />
      <GameFormWrapper title="Add a Game">
        <GameForm />
      </GameFormWrapper>
      <GameFormSidePanel src={formBackground.src} position="50%" />
    </Container>
  );
};

export default page;
