import Calendar from '@/components/molecules/Calendar';
import ScheduleView from '@/components/templates/ScheduleView';

const CalendarPage = () => (
  <div className="p-6">
    <h2 className="text-xl font-extrabold mb-4">오운했 일정보기</h2>
    <div className="flex gap-8">
      <Calendar />
      <ScheduleView />
    </div>
  </div>
);

export default CalendarPage;
