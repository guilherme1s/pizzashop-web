import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
  GetManagedRestaurant,
  type ManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfile } from "@/api/update-profile";
import { toast } from "sonner";

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: ManagedRestarant } = useQuery({
    queryKey: ["maneged-restaurant"],
    queryFn: GetManagedRestaurant,
    staleTime: Infinity,
  });

  const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
  });

  type storeProfileSchemaType = z.infer<typeof storeProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<storeProfileSchemaType>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: ManagedRestarant?.name ?? "",
      description: ManagedRestarant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: UpdateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<ManagedRestaurantResponse>([
        "maneged-restaurant",
      ]);

      if (cached) {
        queryClient.setQueryData<ManagedRestaurantResponse>(
          ["maneged-restaurant"],
          {
            ...cached,
            name,
            description,
          },
        );
      }
    },
  });

  async function handleUpdateProfile(data: storeProfileSchemaType) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informaçẽos do seu estabelecimento visiveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid-col-4 grid items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          <div className="grid-col-4 grid items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
