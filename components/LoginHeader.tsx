"use client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

const LoginHeader = () => {
  return (
    <Container className="space-y-4 text-center bg-gradient-to-b from-black to-blue-950/70 p-8 rounded-t-xl backdrop-blur-sm">
      <h3 className="text-2xl font-light text-sky-200">Hearts Connected</h3>
      <Text className="text-xs text-blue-300/80">Enter your Keyblade to manage your games</Text>
    </Container>
  );
};

export default LoginHeader;
