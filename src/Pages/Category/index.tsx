import { Link, useLoaderData } from "react-router-dom";
import { Category, Person } from "../../shared/types";
import { useQuery } from "react-query";
import { getMatchingEntity } from "../../shared/API";
import { TableView, TableHeader, Text, Column, TableBody, Row, Cell, Flex, ActionButton, Button, ButtonGroup, Content, Dialog, DialogTrigger } from "@adobe/react-spectrum";
import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";

export const CategoryPage = () => {
  const { categoryName } = useLoaderData() as { categoryName: Category };
  const { data, status: queryStatus } = useQuery([Category.PEOPLE], () => getMatchingEntity(Category.PEOPLE), { enabled: categoryName === Category.PEOPLE });
  const [people, setPeople] = useState<Map<Person["created"], Person>>();
  const [editingPerson, setEditingPerson] = useState<Person["created"]>();
  const [showNewPersonForm, setShowNewPersonForm] = useState(false);

  useEffect(() => {
    if (data) {
      setPeople(data.results.reduce((map, person) => {
        map.set(person.created, person);
        return map;
      }, new Map<Person["created"], Person>()));
    }
  }, [data]);

  if (categoryName !== Category.PEOPLE) {
    return <h1 className="capitalize">{categoryName ?? "category"}</h1>
  }

  function savePerson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newPerson = (["name", "birth_year", "gender", "height", "eye_color", "created"] as const).reduce((personObj: Person, property) => {
      personObj[property] = formData.get(property) as string;
      return personObj;
    }, {} as Person);

    if (!editingPerson) {
      newPerson.created = new Date().toISOString();
    } else {
      newPerson.created = editingPerson;
    }

    const newPeople = new Map(people);
    newPeople.set(newPerson.created, newPerson);
    setPeople(newPeople);
    setEditingPerson("");
    setShowNewPersonForm(false);
  }

  function deletePerson(created: string) {
    const newPeople = new Map(people);
    newPeople.delete(created);
    setPeople(newPeople);
  }

  const TableStatusDisplay = ({
    loading: 'loading',
    idle: 'idle',
    error: 'idle',
    success: 'idle',
  } as const)[queryStatus]

  const showPersonForm = editingPerson || showNewPersonForm;

  return (
    <div className="w-[900px] bg-black flex flex-col">

      <h1>People</h1>
      <Link to="/" className="self-start mt-10 text-2xl">Return to search</Link>

      <Flex height="size-5000" width="100%" direction="column" gap="size-150">
        <div className={`mb-10 self-end ${showNewPersonForm && '[&>button]:bg-teal'}`}>
          <ActionButton alignSelf="end" onPress={() => setShowNewPersonForm(current => !current)}>Add Person</ActionButton>
        </div>
        {showPersonForm ? (
          <section className="h-80 my-6 flex justify-center">
            <PersonForm key={editingPerson ?? undefined} defaultValues={editingPerson ? people?.get(editingPerson) : undefined} onSave={savePerson} onCancel={() => editingPerson ? setEditingPerson("") : setShowNewPersonForm(false)} />
          </section>
        ) :
          <TableView flex aria-label="Example table with static contents">
            <TableHeader >
              <Column align="center">Name</Column>
              <Column align="center">Birth year</Column>
              <Column align="center">Gender</Column>
              <Column align="center">Height</Column>
              <Column align="center">Eye Color</Column>
              <Column align="center" width={200}>Actions</Column>
            </TableHeader>
            <TableBody loadingState={TableStatusDisplay}>
              {Array.from(people?.values() ?? []).map((person) => (
                <Row key={person.created}>
                  <Cell>{person.name}</Cell>
                  <Cell>{person.birth_year}</Cell>
                  <Cell>{person.gender}</Cell>
                  <Cell>{person.height}</Cell>
                  <Cell>{person.eye_color}</Cell>
                  <Cell>
                    <div className="flex gap-1 justify-center">
                      <ActionButton
                        onPress={() => setEditingPerson(person.created)}
                        isQuiet UNSAFE_className="!text-[#fbe122] action-normal">Edit</ActionButton>
                      <DialogTrigger>
                        <ActionButton isQuiet UNSAFE_className="!text-[#c8102e] action-danger">Delete</ActionButton>
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
                                deletePerson(person.created);
                              }}>Confirm</Button>
                            </ButtonGroup>
                          </Dialog>
                        )}
                      </DialogTrigger>
                    </div>
                  </Cell>
                </Row>)
              )}
            </TableBody>
          </TableView>}
      </Flex >
    </div >
  );
}