import React, { useEffect, useState } from "react";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

export const ViewDB = () => {

   const [patient, setPatient] = useState({name: ''}) 

  const load = async () => {
    // create database
    const db = await createRxDatabase({
      name: "patientDb",
      storage: getRxStorageDexie(),
    });

    // create collections
    const collections = await db.addCollections({
      patients: {
        schema: {
            "title": "patient schema",
            "version": 0,
            "description": "describes a patient",
            "primaryKey": "id",
            "type": "object",
            "properties": {
                "id": {
                    "type": "number",
                    "maxLength": 100 // <- the primary key must have set maxLength
                },
                "name": {
                    "type": "string"
                },
            },
            "required": [
                "name",
                "id"
            ],
          }
      },
    });

    

    // run a query
    const result = await collections.patients
      .find({
        selector: {
          name: "bar",
        },
      })
      .exec();

      if(result.length == 0){
        // insert document
        await collections.patients.insert({ id: "foo", name: "bar" });
      }

    // observe a query
    await collections.patients
      .find({
        selector: {
          name: "bar",
        },
      })
      .$.subscribe((result) => {
        setPatient(result[0]);
      });
  };

  useEffect(() => {
    load();
  }, [])

  return <div>
    <h1>Loading patients</h1>
    {patient.name}
    </div>
};
