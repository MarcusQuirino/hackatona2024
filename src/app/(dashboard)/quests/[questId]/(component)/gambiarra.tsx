"use client";

import { useState } from "react";
import { SonerButton } from "@/components/soner-button";
import { CardFooter } from "@/components/ui/card";
import { Users, Badge } from "lucide-react";

export function Gambiarra() {
  const [participants, setParticipants] = useState(5);
  const maxParticipants = 9;

  const handleSonerClick = () => {
    if (participants < maxParticipants) {
      setParticipants((prev) => prev + 1);
    }
  };

  return (
    <CardFooter className="flex items-center justify-between border-t p-6">
      <div className="flex items-center space-x-3">
        <Users className="h-6 w-6 text-gray-500" />
        <span className="text-lg text-gray-600">
          {participants}/{maxParticipants} participantes
        </span>
      </div>
      <Badge className="bg-green-500 px-4 py-2 text-lg text-white">
        disponivel
      </Badge>
      <SonerButton onClick={handleSonerClick} />
    </CardFooter>
  );
}
