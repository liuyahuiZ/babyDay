import React from 'react';
import { Input, Select, Selects, Textarea, Text, DatePicker, Dynamic, Switch } from '../Components/';


export default function genInput(item, rowIdx) {
  switch (item.type) {
    case 'select':
      return (
        <Select
          {...item}
          ref={(r) => { this[`$$${item.key}`] = r; }}
          onChange={(e) => {
            if (item.change) {
              const doms = item.changeParams.map(key => this[`$$wrap-${key}`]);
              const inputDoms = item.changeParams.map(key => this[`$$${key}`]);
              item.change(e.target.value, ...doms, ...inputDoms);
            }
          }}
        />
      );
    case 'selects':
      return (
        <Selects
          {...item}
          ref={(r) => { this[`$$${item.key}`] = r; }}
          onChange={(e) => {
            if (item.change) {
              if (item.changeParams) {
                const doms = item.changeParams.map(key => this[`$$wrap-${key}`]);
                const inputDoms = item.changeParams.map(key => this[`$$${key}`]);
                item.change(JSON.parse(e.target.dataset.content), ...doms, ...inputDoms, e.target);
              } else {
                item.change(item, JSON.parse(e.target.dataset.content), rowIdx);
              }
            }
          }}
        />
      );
    case 'textarea':
      return (
        <Textarea
          {...item}
          ref={(r) => { this[`$$${item.key}`] = r; }}
        />
      );
    case 'date':
      return (
        <DatePicker
          {...item}
          isValidDate={(currentDate) => {
            const minTime = item.minTime;
            const maxTime = item.maxTime;
            const minDateObj = new Date(minTime);
            const maxDateObj = new Date(maxTime);

            if (minTime
                && +new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate())
                > +currentDate) {
              return false;
            }

            if (maxTime
                && +new Date(maxDateObj.getFullYear(), maxDateObj.getMonth(), maxDateObj.getDate())
                < +currentDate) {
              return false;
            }

            return true;
          }}
          ref={(r) => { this[`$$${item.key}`] = r; }}
        />
      );
    case 'dynamic':
      return (
        <Dynamic
          {...item}
          ref={(r) => { this[`$$${item.key}`] = r; }}
        />
      );
    case 'Switch':
      return (
        <Switch
          ref={(r) => { this[`$$${item.key}`] = r; }}
          {...item}
          onchange={(e) => {
            if (item.change) {
              if (item.changeParams) {
                const doms = item.changeParams.map(key => this[`$$wrap-${key}`]);
                const inputDoms = item.changeParams.map(key => this[`$$${key}`]);
                item.change(item, e, rowIdx, ...doms, ...inputDoms);
              } else {
                item.change(item, e, rowIdx);
              }
            }
          }}
        />
      );
    case 'Text':
      return (
        <Text {...item} />
      );
    case 'Input':
      return (
        <Input
          ref={(r) => { this[`$$${item.key}`] = r; }}
          {...item}
          onChange={(e, self, value) => {
            if (item.change) {
              item.change(item, value, rowIdx);
            }
          }}
        />
      );
    default:
      if (item.type === 'number') {
        item.maxLengthShow = false;
      }
      return (
        <Input
          ref={(r) => { this[`$$${item.key}`] = r; }}
          {...item}
        />
      );
  }
}
