/**
 *
 * Storybook Component DataGrid
 *
 */

import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { DataGrid } from '.';

export default {
  component: DataGrid,
  title: 'DataGrid',
} as ComponentMeta<typeof DataGrid>;

const Template: ComponentStory<typeof DataGrid> = (args: any) => (
  <DataGrid {...args} />
);

export const Default = Template.bind({});

Default.args = {
  data: {
    columns: [
      'name',
      'phone',
      'email',
      'address',
      'postalZip',
      'region',
      'country',
    ],
    rows: [
      {
        name: 'Macey Howe',
        phone: '(649) 807-7536',
        email: 'magna.malesuada.vel@protonmail.org',
        address: '4646 Nec, Road',
        postalZip: '3334',
        region: 'Andaman and Nicobar Islands',
        country: 'China',
      },
      {
        name: 'Tanya Johnston',
        phone: '1-459-564-0341',
        email: 'vel.est@icloud.com',
        address: '754-2484 Accumsan Rd.',
        postalZip: '821208',
        region: 'Odisha',
        country: 'Italy',
      },
      {
        name: 'Tanner Williams',
        phone: '1-924-376-7263',
        email: 'adipiscing.mauris@yahoo.com',
        address: '833-1129 Cras Street',
        postalZip: '377265',
        region: 'Junín',
        country: 'Canada',
      },
      {
        name: 'Melanie Hendrix',
        phone: '1-558-521-1117',
        email: 'diam.sed@yahoo.ca',
        address: '992-3504 Tincidunt Street',
        postalZip: '475935',
        region: 'New South Wales',
        country: 'Italy',
      },
      {
        name: 'Montana Mcmillan',
        phone: '(581) 820-5822',
        email: 'nulla.vulputate@protonmail.edu',
        address: 'Ap #698-4418 Dui. Street',
        postalZip: '09577',
        region: 'Los Lagos',
        country: 'Netherlands',
      },
    ],
  },
};
