import { useLoaderData } from "react-router-dom";
import { Category, Person } from "../../shared/types";
import { useQuery } from "react-query";
import { getMatchingEntity } from "../../shared/API";
import { TableView, TableHeader, Column, TableBody, Row, Cell, Flex, ActionButton } from "@adobe/react-spectrum";
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
    return <h1>{categoryName ?? "category"}</h1>
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

  return (
    <div className="w-[900px]">
      <h1>People</h1>

      <section className="h-24 my-6">
        {editingPerson && <PersonForm key={editingPerson} defaultValues={people?.get(editingPerson)} onSave={savePerson} onCancel={() => setEditingPerson("")} />}
        {showNewPersonForm && <PersonForm onSave={savePerson} onCancel={() => setShowNewPersonForm(false)} />}
      </section>

      <Flex height="size-5000" width="100%" direction="column" gap="size-150">
        <ActionButton alignSelf="end" onPress={() => setShowNewPersonForm(true)}>Add Person</ActionButton>
        <TableView flex aria-label="Example table with static contents">
          <TableHeader>
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
                    <button onClick={() => setEditingPerson(person.created)}>Edit</button>
                    <button onClick={() => deletePerson(person.created)}>Delete</button>
                  </div>
                </Cell>
              </Row>)
            )}
          </TableBody>
        </TableView>
      </Flex>

    </div>
  );
}