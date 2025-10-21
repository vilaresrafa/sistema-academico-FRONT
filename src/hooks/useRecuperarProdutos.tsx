import { useQuery } from "@tanstack/react-query";

const recuperarProdutos = async () => {
  const response = await fetch("http://localhost:8080/produtos");
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar produtos. Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarProdutos = () => {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: () => recuperarProdutos(),
    staleTime: 10_000,
  });
};
export default useRecuperarProdutos;
