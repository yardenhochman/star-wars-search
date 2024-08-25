import { ActionButton, Button, ButtonGroup, Content, Dialog, TextField, Text, DialogTrigger, Form } from "@adobe/react-spectrum";
import { Person } from "../../shared/types";
import { capitalize } from "../../shared/utils";
import character from "../../character.svg";

interface PersonFormProps {
  defaultValues?: Person;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const PersonForm = ({ defaultValues, onSave, onCancel }: PersonFormProps) => {

  return (
    <div className="flex p-5 justify-center gap-5">
      <Form validationBehavior="native" UNSAFE_className="flex flex-col gap-4 items-start justify-between" onSubmit={onSave}>
        <div className="flex justify-between gap-1 flex-col p-4 pl-0">
          {(["name", "birth_year", "gender", "height", "eye_color"] as const).map((property) => (
            <div className="flex" key={property}>
              <label className="w-28 mb-2 flex" htmlFor={property}>{capitalize(property).replace(/_/g, ' ')}:</label>
              <TextField
                isRequired
                isQuiet
                errorMessage={null}
                type="text" name={property} id={property} defaultValue={defaultValues?.[property]}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <ActionButton type="submit">Save</ActionButton>
          <DialogTrigger>
            <ActionButton>Cancel</ActionButton>
            {(close) => (
              <Dialog>
                <Content>
                  <Text>
                    Cancelling will discard all changes made. Do you want to continue?
                  </Text>
                </Content>
                <ButtonGroup>
                  <Button variant="secondary" onPress={close}>Cancel</Button>
                  <Button variant="negative" onPress={() => {
                    close();
                    onCancel();
                  }}>Confirm</Button>
                </ButtonGroup>
              </Dialog>
            )}
          </DialogTrigger>
        </div>
      </Form>
      <div className="bg-offwhite h-full flex justify-center items-center">
        <img className="h-full object-" src={character} alt="new character" />
      </div>
    </div >
  )
}

export default PersonForm