import EmptyStateProps from './type';

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[240px] text-gray-400 text-body-md">
      {message}
    </div>
  );
};

export default EmptyState;
