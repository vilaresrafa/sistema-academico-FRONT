import { useQuery } from "@tanstack/react-query";

const recuperarTurmas = async () => {
  const response = await fetch("http://localhost:8080/turmas");
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar turmas. Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarTurmas = () => {
  return useQuery({
    queryKey: ["turmas"],
    queryFn: () => recuperarTurmas(),
    staleTime: 10_000,
  });
};
export default useRecuperarTurmas;
