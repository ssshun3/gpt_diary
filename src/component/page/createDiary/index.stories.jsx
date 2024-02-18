import { CreateDiary } from ".";
import { MemoryRouter } from "react-router-dom";

export default { component: CreateDiary };

export const Default = () => (
  <MemoryRouter>
    <CreateDiary />
  </MemoryRouter>
);
