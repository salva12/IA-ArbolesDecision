import React from "react"
import Attribute from "../components/Attribute"
import { ATTRIBUTE_TEMPLATE } from "../utils/constants"

const Attributes = ({ attributes, setAttributes }) => {
  const onAddAttribute = () => {
    setAttributes([...attributes, ATTRIBUTE_TEMPLATE])
  }

  const onEditName = (index, newName) => {
    const newAttributes = [...attributes]
    newAttributes.splice(index, 1, {
      ...attributes[index],
      label: newName,
    })
    setAttributes(newAttributes)
  }

  const onEditValue = (index, valueIndex, newValue) => {
    const newAttributes = [...attributes]
    const newValues = [...attributes[index].values]
    newValues.splice(valueIndex, 1, newValue)
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: newValues,
    })
    setAttributes(newAttributes)
  }

  const onAddValue = (index) => {
    const newAttributes = [...attributes]
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: [...attributes[index].values, ""],
    })
    setAttributes(newAttributes)
  }

  const onDeleteValue = (index, valueIndex) => {
    const newAttributes = [...attributes]
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: attributes[index].values.filter((_v, i) => i !== valueIndex),
    })
    setAttributes(newAttributes)
  }

  const onDeleteAttribute = (index) => {
    const newAttributes = attributes.filter((_a, i) => i !== index)
    setAttributes(newAttributes)
  }

  return (
    <div className="tile is-ancestor is-vertical">
      {attributes.map((attr, idx) => (
        <Attribute
          key={idx}
          id={idx}
          attribute={attr}
          onEditName={onEditName}
          onEditValue={onEditValue}
          onAddValue={onAddValue}
          onDeleteValue={onDeleteValue}
          onDeleteAttribute={onDeleteAttribute}
        />
      ))}
      <div className="tile is-child">
      <button className="button is-primary" onClick={onAddAttribute}>
        + Nuevo atributo
      </button>
      </div>
    </div>
  )
}

export default Attributes