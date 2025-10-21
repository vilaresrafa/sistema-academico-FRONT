import { useQuery } from "@tanstack/react-query";

const recuperarProdutoPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/produtos/" + id);
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar o produto com id = " + id + ". Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarProdutoPorId = (id: number) => {
  return useQuery({
    queryKey: ["produtos", id],
    queryFn: () => recuperarProdutoPorId(id),
    staleTime: 10_000,
  });
};
export default useRecuperarProdutoPorId;
