import { ActionButton } from "@adobe/react-spectrum";
import { Person } from "../../shared/types";
import { capitalize } from "../../shared/utils";

interface PersonFormProps {
  defaultValues?: Person;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const PersonForm = ({ defaultValues, onSave, onCancel }: PersonFormProps) => {

  return (
    <form className="flex flex-col gap-4 items-start p-5" onSubmit={onSave}>
      <div className="flex justify-between gap-1">
        {(["name", "birth_year", "gender", "height", "eye_color"] as const).map((property) => (
          <div className="flex flex-col" key={property}>
            <label htmlFor={property}>{capitalize(property)}</label>
            <input className="text-center" type="text" name={property} id={property} defaultValue={defaultValues?.[property]}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <ActionButton type="submit">Save</ActionButton>
        <ActionButton onPress={onCancel}>Cancel</ActionButton>
      </div>
    </form>
  )
}

export default PersonForm