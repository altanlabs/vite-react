import { useForm } from "react-hook-form"
import { useEffect } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableSchema, Record, Fields } from "../types.ts";

interface EditModalProps {
  record: Record | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Fields) => void;
  schema: TableSchema | null;
}

export function EditModal({ record, isOpen, onClose, onSave, schema }: EditModalProps) {
  const form = useForm<Fields>({
    defaultValues: record?.fields || {},
  })

  // Reset form when record changes
  useEffect(() => {
    if (record) {
      form.reset(record.fields);
    }
  }, [record, form]);

  function onSubmit(data: Fields) {
    onSave(data)
    onClose()
  }

  // Early return if schema or fields are missing
  if (!schema?.fields?.items) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {record ? 'Edit Record' : 'Create Record'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {schema.fields.items.map((field) => (
              field && field.name ? (
                <FormField
                  key={field.id || field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.name}</FormLabel>
                      <FormControl>
                        <Input 
                          type={field.cell_value_type === 'date' ? 'date' : 'text'} 
                          {...formField} 
                          value={String(formField.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : null
            ))}

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 