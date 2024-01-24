import { RingProgress, Text, SimpleGrid, Paper, Center, Group} from '@mantine/core';
import {ReactComponent as ArrowRightUp} from "../../assets/arrowRightUp.svg";
import {ReactComponent as ArrowRightDown} from "../../assets/arrowRightDown.svg";
import styles from "../MonthlyGoal/monthlyGoal.module.scss";
const icons = {
  up: ArrowRightUp,
  down: ArrowRightDown,
};
const data = [
  { 
    label: 'Income', 
    stats: '456,578',
     progress: 65, 
     color: 'teal', 
     icon: 'up' 
    },
  { 
    label: 'Expense', 
    stats: '2454', 
    progress: 72, 
    color: 'blue',
     icon: 'up' 
    },
  {
    label: 'Goal Status',
    stats: '4,735',
    progress: 52,
    color: 'red',
    icon: 'down',
  },
] as const;
export function MonthlyGoal() {
  const getMonthlyData=()=>
  {
    
  }
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress,color: stat.color}]}
            label={
              <Center>
                <Icon
                style={{ width: "10rem", height: "2rem"}} 
                stroke={"0.5"} />
              </Center>
            }
          />
          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl" c={"#000"}>
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}