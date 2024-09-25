import { FC } from 'react';
import { Box } from '@mui/material';
import { Tabs } from 'helix';
import MyTasks from '../../../home/components/MyTasks/MyTasks';
import RecentlyViewed from '../../../home/components/RecentlyViewed/RecentlyViewed';


/**
 * Component for your work header menu.
 */
export const YourWork: FC = () => {
  // Hooks.
  return (
    <Box data-id="header-your-work" position="relative" maxWidth={600} minWidth={600}>
      <Tabs
        dataId="header-your-work"
        tabs={[
          {
            id: 'my-tasks',
            label: "My Tasks",
            content: <MyTasks />,
          },
          {
            id: 'recently-viewed',
            label: "Recently Viewed",
            content: <RecentlyViewed />,
          },
        ]}
      />
    </Box>
  );
};

export default YourWork;
