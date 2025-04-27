import { Link } from 'react-router-dom'
import { Calendar, Users, AlertTriangle, Clock, Activity, LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'amber' | 'green';
}

export function DashboardView() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, Dr. Gupta</h1>
        <p className="mt-1 text-sm text-gray-500">Here's your schedule for today</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Calendar}
          label="Today's Appointments"
          value="8"
          trend="+2 from yesterday"
          trendDirection="up"
        />
        <StatCard 
          icon={Users}
          label="Total Patients"
          value="1,247"
          trend="+12 this month"
          trendDirection="up"
        />
        <StatCard 
          icon={AlertTriangle}
          label="Critical Cases"
          value="3"
          trend="No change"
          trendDirection="neutral"
          color="amber"
        />
        <StatCard 
          icon={Clock}
          label="Avg. Wait Time"
          value="12m"
          trend="-3m from last week"
          trendDirection="down"
          color="green"
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Patients</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {[
              {
                name: 'Sunil Kumar',
                time: '10:30 AM',
                reason: 'Follow-up',
                status: 'Scheduled'
              },
              {
                name: 'Mithilesh Sharma',
                time: '11:15 AM',
                reason: 'Blood Pressure Check',
                status: 'In Progress'
              },
              {
                name: 'Anjali Verma',
                time: '12:00 PM',
                reason: 'Annual Physical',
                status: 'Scheduled'
              }
            ].map((patient, i) => (
              <div key={i} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{patient.time}</p>
                    <span className={`
                      inline-block px-2 py-1 text-xs rounded-full
                      ${patient.status === 'In Progress' 
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                      }
                    `}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
            <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              New Appointment
            </button>
            <Link 
              to="/consultation/new"
              className="w-full px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700 flex items-center justify-center"
            >
              <Activity className="w-4 h-4 mr-2" />
              Start Consultation
            </Link>
            <Link
              to="/patients"
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center"
            >
              <Users className="w-4 h-4 mr-2" />
              View All Patients
            </Link>
          </div>

          {/* Tasks Overview */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Tasks</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="space-y-3">
                {[
                  { task: 'Review Lab Results', priority: 'High', time: '2:00 PM' },
                  { task: 'Update Treatment Plans', priority: 'Medium', time: '3:30 PM' },
                  { task: 'Team Meeting', priority: 'Regular', time: '4:00 PM' }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <span className={`
                        text-xs
                        ${task.priority === 'High' ? 'text-red-600' :
                          task.priority === 'Medium' ? 'text-amber-600' :
                          'text-gray-600'
                        }
                      `}>
                        {task.priority} Priority
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{task.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, trend, trendDirection, color = 'primary' }: StatCardProps) {
  const colors = {
    primary: 'bg-primary-50 text-primary-700',
    amber: 'bg-amber-50 text-amber-700',
    green: 'bg-green-50 text-green-700'
  } as const;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {trend && (
        <p className={`
          mt-1 text-xs
          ${trendDirection === 'up' ? 'text-green-600' :
            trendDirection === 'down' ? 'text-red-600' :
            'text-gray-600'
          }
        `}>
          {trend}
        </p>
      )}
    </div>
  )
}